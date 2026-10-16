#include "PhraseMapper.h"
#include <regex>
#include <sstream>
#include <algorithm>
#include <cctype>
#include <unordered_set>

namespace {
std::string ToLower(const std::string& s) {
  std::string r = s;
  for (auto& c : r) c = tolower((unsigned char)c);
  return r;
}
std::string Trim(const std::string& s) {
  size_t a = 0; while (a < s.size() && isspace((unsigned char)s[a])) ++a;
  size_t b = s.size(); while (b > a && isspace((unsigned char)s[b-1])) --b;
  return s.substr(a, b-a);
}
}

std::string PhraseMapper::NormalizePhrase(const std::string& content) {
  std::string text = ToLower(content);
  text = std::regex_replace(text, std::regex("[?!.,;]+(?=\s|$)"), " ");
  text = std::regex_replace(text, std::regex("\s+"), " ");
  text = Trim(text);
  for (int pass = 0; pass < 6; ++pass) {
    std::string next = text;
    next = std::regex_replace(next, std::regex("^(?:hey|hi|hello|ok|okay|yo)\s+"), "");
    next = std::regex_replace(next, std::regex("^(?:can|could|would|will)\s+you\s+"), "");
    next = std::regex_replace(next, std::regex("^(?:please|kindly)\s+"), "");
    if (next == text) break;
    text = Trim(next);
  }
  return text;
}

bool PhraseMapper::Has(const std::string& text, const std::string& pattern) {
  return std::regex_search(text, std::regex(pattern, std::regex_constants::icase));
}

std::optional<std::string> PhraseMapper::CleanName(const std::string& value) {
  std::string name = Trim(value);
  if (name.size() >= 2 && name.front() == '"' && name.back() == '"')
    name = name.substr(1, name.size()-2);
  if (!std::regex_match(name, std::regex("^[a-z0-9._-]{1,40}$", std::regex_constants::icase)))
    return std::nullopt;
  static const std::unordered_set<std::string> stop = {
    "the","that","this","a","an","process","service","my","your","it","computer",
    "pc","system","laptop","machine","windows","sound","volume","please","fonia",
    "window","screen","file","folder","app","program","device","running","status"
  };
  if (stop.find(ToLower(name)) != stop.end()) return std::nullopt;
  return name;
}

bool PhraseMapper::AsksOff(const std::string& text) {
  return (Has(text, "\b(turn|switch|set)\b") && Has(text, "\boff\b")) || Has(text, "\bdisable\b");
}
bool PhraseMapper::AsksOn(const std::string& text) {
  return (Has(text, "\b(turn|switch|set)\b") && Has(text, "\bon\b")) || Has(text, "\benable\b");
}

struct Hit { std::string action; std::string target; int score; };
static void AddHit(std::vector<Hit>& hits, const std::string& action, int score, const std::string& target = "") {
  if (score>0) hits.push_back({action,target,score});
}
static std::optional<PhraseAction> BestHit(std::vector<Hit>& hits) {
  if (hits.empty()) return std::nullopt;
  std::sort(hits.begin(), hits.end(), [](const Hit& l,const Hit& r){return r.score>l.score;});
  const Hit& w = hits[0];
  if (w.score < 6) return std::nullopt;
  for (auto& h: hits) {
    if (h.action != w.action || h.target != w.target) {
      if (w.score - h.score < 2) return std::nullopt;
      break;
    }
  }
  return PhraseAction{w.action,w.target};
}

std::optional<PhraseAction> PhraseMapper::MapPhrase(const std::string& content) {
  std::string text = NormalizePhrase(content);
  if (text.empty()) return std::nullopt;
  if (Has(text, "\b(function|component|bug|refactor|fix|indicator|website|css|html|javascript|typescript|repo|repository|file|folder|code)\b")
      && !Has(text, "\b(percent|percentage|screenshot|transcribe)\b")) return std::nullopt;
  const bool ejecting = Has(text, "\b(eject|unplug)\b") || Has(text, "\bsafely\s+remove\b");
  const bool percent = Has(text, "\b(percent|percentage|%)\b");
  const bool systemish = Has(text, "\b(system|laptop|pc|computer|machine)\b");
  const bool diskWord = Has(text, "\b(disk|drive|storage|ssd|hdd|hard\s*drive)\b");
  const bool ramWord = Has(text, "\bram\b") || (Has(text, "\bmemory\b") && !Has(text, "\b(remember|memorial)\b"));
  const bool cpuWord = Has(text, "\b(cpu|processor)\b");
  const bool batteryWord = Has(text, "\b(battery|charging)\b") || Has(text, "\b(charge|power)\s+(left|remaining|level|percent|percentage)\b");
  std::vector<Hit> hits;
  auto add = [&](const std::string& a,int s,const std::string& t=""){AddHit(hits,a,s,t);};
  if (percent && diskWord) add("disk_space",9);
  else if (percent && ramWord) add("memory_status",9);
  else if (percent && cpuWord) add("cpu_status",8);
  else if (percent && (batteryWord||systemish)) add("battery_status",9);
  if (batteryWord) add("battery_status",7);
  if (!ejecting && diskWord && Has(text,"\b(space|free|full|left|used|usage|storage|much)\b") && !Has(text,"\bformat\b")) add("disk_space",7);
  if (ramWord) add("memory_status",7);
  if (cpuWord) add("cpu_status",7);
  if (Has(text,"\b(gpu|graphics\s+card|video\s+card)\b")) add("gpu_status",7);
  if (Has(text,"\b(monitor|resolution|screen\s+size)\b") && !Has(text,"\b(screenshot)\b")) add("display_status",7);
  if (Has(text,"\b(screenshot|screen\s*shot)\b")) add("screenshot",8);
  if (Has(text,"\bbrightness\b")) { add("brightness_status",7); }
  if (Has(text,"\b(bluetooth)\b")) {
    if (AsksOff(text)) add("bluetooth_off",9);
    else if (AsksOn(text)) add("bluetooth_on",9);
    else add("bluetooth_status",7);
  }
  if (Has(text,"\bfirewall\b")) {
    if (AsksOff(text)) add("firewall_off",9);
    else if (AsksOn(text)) add("firewall_on",9);
    else add("firewall_status",7);
  }
  if (Has(text,"\b(wi-?fi|wireless)\b")) add("wifi_status",7);
  if (Has(text,"\b(volume|loud)\b")) add("volume_status",7);
  if (Has(text,"\b(shut\s*down|shutdown|power\s*off)\b")) add("shutdown",9);
  if (Has(text,"\b(restart|reboot)\b")) add("restart",8);
  if (Has(text,"\b(sleep|suspend)\b")) add("sleep",8);
  return BestHit(hits);
}

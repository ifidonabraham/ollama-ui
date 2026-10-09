/** Plain sentences for computer results a person can read. No model and no wait. */

const OFF_FULL = "The microphone is off for now. Sound from it is muted, and apps in your Windows account are blocked from using it. It was not removed from Device Manager. Say turn the microphone on when you want it back.";
const OFF_MUTE_ONLY = "The microphone is muted for now. The privacy switch was not changed, so an app may still be allowed to open it. It was not removed from Device Manager. Say turn the microphone on when you want the mute lifted.";
const OFF_PRIVACY_ONLY = "Apps in your Windows account are blocked from using the microphone. The mute could not be confirmed, so a program that already has the microphone open may still hear you. The hardware was not removed. Say turn the microphone on when you want apps to use it again.";
const STILL_ON = "The microphone is still on. Windows refused to switch off the microphones. Generic failure means this program is not allowed to disable that hardware. Nothing was switched off.";

function mentionsMicrophone(action: string, target: string, result: string): boolean {
  if (action === "microphone_off" || action === "microphone_on") return true;
  if (/^(microphone|mic)$/i.test(target.trim())) return true;
  return /microphone|conexant|\bmic\b/i.test(result);
}

export function plainComputerResult(action: string, target: string, result: string): string {
  const mic = mentionsMicrophone(action, target, result);
  const wantsOff = action === "microphone_off" || (action === "device_disable" && mic);
  const wantsOn = action === "microphone_on" || (action === "device_enable" && mic);
  const hasLine = /Microphone:/i.test(result);
  const muted = /muted=True/i.test(result);
  const unmuted = /muted=False/i.test(result);
  const denied = /consent=Deny/i.test(result);
  const allowed = /consent=Allow/i.test(result);

  if (hasLine && wantsOff && muted && denied) return OFF_FULL;
  if (hasLine && wantsOff && muted) return OFF_MUTE_ONLY;
  if (hasLine && wantsOff && denied) return OFF_PRIVACY_ONLY;
  if (hasLine && wantsOff) return "The microphone is still on. The mute did not stick, and apps in this Windows account can still use it. Nothing was removed from Device Manager.";
  if (hasLine && wantsOn && muted && !unmuted) return "The microphone is still muted. Say turn the microphone on again if you want sound from it.";
  if (hasLine && wantsOn && (unmuted || allowed)) return "The microphone is on again. Sound from it is unmuted, and apps in your Windows account may use it. Fonia still waits until you click Listen.";

  if (/generic failure/i.test(result) && mic) return STILL_ON;
  if (/generic failure/i.test(result)) {
    return "Windows refused that device change. Generic failure usually means this program is not an administrator, so the device is still as it was.";
  }
  if (/too many devices/i.test(result)) {
    return "Several devices matched that name, so nothing was changed. The reading lists the names. Pick one name and ask again.";
  }
  if (/no device matched/i.test(result)) {
    return "No device with that name was found, so nothing was changed.";
  }
  if (/needs an Administrator terminal/i.test(result)) {
    return "Windows refused that change because this program is not an administrator. Nothing was changed.";
  }
  if (/^Error:/m.test(result) && /^(device_enable|device_disable|microphone_off|microphone_on)$/.test(action)) {
    return "That device change did not work. Nothing was switched off. The lines under Computer reading are the computer's own message.";
  }
  return "";
}

/** User-facing text plus the original reading. An empty plain sentence leaves the reading alone. */
export function presentComputerResult(action: string, target: string, result: string): string {
  const plain = plainComputerResult(action, target, result);
  if (!plain || result.includes("\nComputer reading:\n")) return result;
  return `${plain}\n\nComputer reading:\n${result}`;
}

export function toolResultFailed(result: string): boolean {
  return /^(?:Error:|Command failed\b)|did not finish|generic failure|still on|could not be confirmed|nothing was switched off|nothing was changed|did not work|no output for \d+ seconds|stopped after \d+ seconds|windows refused/i.test(result);
}

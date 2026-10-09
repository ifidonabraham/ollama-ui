/** PowerShell for the Windows controls that are not in the original component report. */

export function brightnessScript(mode: string, level = "0"): string {
  const safeMode = ["status", "up", "down", "set"].includes(mode) ? mode : "status";
  const safeLevel = Math.min(100, Math.max(0, Number(level) || 0));
  return [
    "$ErrorActionPreference = 'Continue'",
    "function Read-Level { $rows = @(Get-CimInstance -Namespace root/WMI -ClassName WmiMonitorBrightness -ErrorAction SilentlyContinue); if ($rows.Count -eq 0) { return $null }; return [int]$rows[0].CurrentBrightness }",
    "function Write-Level($value) { $value = [Math]::Min(100, [Math]::Max(0, [int]$value)); $methods = @(Get-CimInstance -Namespace root/WMI -ClassName WmiMonitorBrightnessMethods -ErrorAction SilentlyContinue); if ($methods.Count -eq 0) { return $false }; foreach ($method in $methods) { Invoke-CimMethod -InputObject $method -MethodName WmiSetBrightness -Arguments @{ Timeout = [uint32]1; Brightness = [byte]$value } | Out-Null }; return $true }",
    `$mode = '${safeMode}'`,
    "$current = Read-Level",
    "if ($null -eq $current) { 'Error: This display does not report a brightness level.'; exit 0 }",
    "if ($mode -eq 'status') { \"Brightness: $current%\"; exit 0 }",
    "$next = $current",
    `if ($mode -eq 'up') { $next = [Math]::Min(100, $current + 10) } elseif ($mode -eq 'down') { $next = [Math]::Max(0, $current - 10) } elseif ($mode -eq 'set') { $next = ${safeLevel} }`,
    "if (-not (Write-Level $next)) { 'Error: This display does not accept a brightness change.'; exit 0 }",
    "$after = Read-Level",
    "if ($null -eq $after) { $after = $next }",
    "\"Brightness: $after% was $current%\"",
  ].join("\n");
}

export function themeScript(mode: string): string {
  const safeMode = mode === "dark" || mode === "light" ? mode : "status";
  const value = safeMode === "dark" ? 0 : 1;
  return [
    "$ErrorActionPreference = 'Continue'",
    "$path = 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Themes\\Personalize'",
    "if (-not (Test-Path $path)) { 'Error: Windows theme settings were not found.'; exit 0 }",
    `$mode = '${safeMode}'`,
    "if ($mode -ne 'status') {",
    `  Set-ItemProperty -Path $path -Name AppsUseLightTheme -Value ${value} -Type DWord`,
    `  Set-ItemProperty -Path $path -Name SystemUsesLightTheme -Value ${value} -Type DWord`,
    "  Add-Type -TypeDefinition 'using System; using System.Runtime.InteropServices; public class ThemeBroadcast { [DllImport(\"user32.dll\", CharSet=CharSet.Auto)] public static extern IntPtr SendMessageTimeout(IntPtr hWnd, int msg, IntPtr wParam, string lParam, int flags, int timeout, out IntPtr result); }' | Out-Null",
    "  $result = [IntPtr]::Zero",
    "  [ThemeBroadcast]::SendMessageTimeout([IntPtr]0xffff, 0x001A, [IntPtr]::Zero, 'ImmersiveColorSet', 2, 1000, [ref]$result) | Out-Null",
    "}",
    "$item = Get-ItemProperty $path",
    "$apps = if ([int]$item.AppsUseLightTheme -eq 0) { 'dark' } else { 'light' }",
    "$system = if ([int]$item.SystemUsesLightTheme -eq 0) { 'dark' } else { 'light' }",
    "\"Theme: apps=$apps system=$system\"",
  ].join("\n");
}

export function defaultsScript(openSettings: boolean): string {
  if (openSettings) {
    return "Start-Process 'ms-settings:defaultapps'; 'Opened Windows default app settings.'";
  }
  return [
    "$ErrorActionPreference = 'Continue'",
    "function Prog($label, $path) { if (Test-Path $path) { $id = (Get-ItemProperty $path -ErrorAction SilentlyContinue).ProgId; if (-not $id) { $id = 'unset' }; \"$label=$id\" } else { \"$label=unknown\" } }",
    "Prog 'http' 'HKCU:\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\http\\UserChoice'",
    "Prog 'https' 'HKCU:\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\https\\UserChoice'",
    "Prog 'mailto' 'HKCU:\\Software\\Microsoft\\Windows\\Shell\\Associations\\UrlAssociations\\mailto\\UserChoice'",
    "Prog 'pdf' 'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\FileExts\\.pdf\\UserChoice'",
    "'Defaults: changing a protected app such as the browser has to be done in Windows Settings. Fonia can open that page.'",
  ].join("\n");
}

export function updatesScript(mode: string): string {
  const safeMode = mode === "scan" || mode === "install" ? mode : "status";
  const lines = [
    "$ErrorActionPreference = 'Continue'",
    "$session = $null",
    "try { $session = New-Object -ComObject Microsoft.Update.Session } catch { 'Error: Windows Update is not available in this session.'; exit 0 }",
    "$searcher = $session.CreateUpdateSearcher()",
    "$reboot = Test-Path 'HKLM:\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\WindowsUpdate\\Auto Update\\RebootRequired'",
    "\"RebootRequired: $reboot\"",
  ];
  if (safeMode === "status") {
    lines.push(
      "$count = 0",
      "try { $count = $searcher.GetTotalHistoryCount() } catch { 'Update history is unavailable.'; exit 0 }",
      "$take = [Math]::Min(5, [int]$count)",
      "if ($take -le 0) { 'Updates: no history'; exit 0 }",
      "$history = $searcher.QueryHistory(0, $take)",
      "foreach ($entry in $history) { \"Update: $($entry.Date) $($entry.Title) result=$($entry.ResultCode)\" }",
    );
  } else if (safeMode === "scan") {
    lines.push(
      "$found = $searcher.Search(\"IsInstalled=0 and IsHidden=0 and Type='Software'\")",
      "\"Pending: $($found.Updates.Count)\"",
      "foreach ($update in $found.Updates) { \"PendingUpdate: $($update.Title)\" }",
    );
  } else {
    lines.push(
      "$found = $searcher.Search(\"IsInstalled=0 and IsHidden=0 and Type='Software'\")",
      "if ($found.Updates.Count -eq 0) { 'Pending: 0'; 'No updates to install.'; exit 0 }",
      "$installer = $session.CreateUpdateInstaller()",
      "$installer.Updates = $found.Updates",
      "$installer.AllowSourcePrompts = $false",
      "$result = $installer.Install()",
      "\"InstallResult: $($result.ResultCode) reboot=$($result.RebootRequired)\"",
      "'Windows may still ask to restart. Fonia did not schedule a restart.'",
    );
  }
  return lines.join("\n");
}

export function clipboardScript(): string {
  return [
    "$ErrorActionPreference = 'Continue'",
    "try { $text = Get-Clipboard -Raw -ErrorAction SilentlyContinue } catch { $text = '' }",
    "if ([string]::IsNullOrWhiteSpace($text)) { 'Clipboard: empty' } else { $text }",
  ].join("\n");
}

export function uiScript(kind: "type" | "click", target: string): string {
  const splitAt = target.indexOf("|");
  const windowQuery = (splitAt === -1 ? target : target.slice(0, splitAt)).replace(/[^A-Za-z0-9 ._-]/g, "").slice(0, 40);
  const payload = (splitAt === -1 ? "" : target.slice(splitAt + 1)).slice(0, 180);
  if (!windowQuery) return "Write-Output 'Error: Name the window.'";
  if (/lock screen|bitlocker|sign-?\s*in/i.test(windowQuery)) {
    return "Write-Output 'Error: That window is the Windows sign-in screen, so nothing was typed or clicked.'";
  }
  const keys = payload.replace(/'/g, "").replace(/[+^%~(){}[\]]/g, (char) => `{${char}}`);
  const button = payload.replace(/'/g, "").replace(/\bbutton\b/gi, "").trim().slice(0, 60);
  if (!keys && kind === "type") return "Write-Output 'Error: There is no text to type.'";
  if (!button && kind === "click") return "Write-Output 'Error: Name the control to click.'";
  return [
    "$ErrorActionPreference = 'Stop'",
    "Add-Type -AssemblyName UIAutomationClient",
    "Add-Type -AssemblyName UIAutomationTypes",
    "Add-Type -AssemblyName System.Windows.Forms",
    "Add-Type -TypeDefinition 'using System; using System.Runtime.InteropServices; public class WinFocus { [DllImport(\"user32.dll\")] public static extern bool SetForegroundWindow(IntPtr hWnd); [DllImport(\"user32.dll\")] public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow); [DllImport(\"user32.dll\")] public static extern IntPtr GetForegroundWindow(); }'",
    `$query = '${windowQuery.replace(/'/g, "")}'`,
    "$root = [System.Windows.Automation.AutomationElement]::RootElement",
    "$windows = $root.FindAll([System.Windows.Automation.TreeScope]::Children, [System.Windows.Automation.Condition]::TrueCondition)",
    "$hits = @($windows | Where-Object { $_.Current.Name -and $_.Current.Name -like \"*$query*\" })",
    "if ($hits.Count -eq 0) { \"Error: No window matched: $query\"; exit 0 }",
    "if ($hits.Count -gt 3) { $names = ($hits | Select-Object -First 6 | ForEach-Object { $_.Current.Name }) -join ', '; \"Error: Too many windows. Name one of: $names\"; exit 0 }",
    "$window = $hits[0]",
    "$handle = [IntPtr]$window.Current.NativeWindowHandle",
    "[WinFocus]::ShowWindow($handle, 9) | Out-Null",
    "[WinFocus]::SetForegroundWindow($handle) | Out-Null",
    "Start-Sleep -Milliseconds 400",
    "$front = [WinFocus]::GetForegroundWindow()",
    "if ($front.ToInt64() -ne $handle.ToInt64()) { 'Error: The window did not come to the front, so nothing was typed or clicked.'; exit 0 }",
    kind === "type"
      ? `$keys = '${keys}'; [System.Windows.Forms.SendKeys]::SendWait($keys); "Typed into: $($window.Current.Name)"`
      : [
        `$buttonName = '${button.replace(/'/g, "")}'`,
        "$controls = $window.FindAll([System.Windows.Automation.TreeScope]::Descendants, [System.Windows.Automation.Condition]::TrueCondition)",
        "$control = @($controls | Where-Object { $_.Current.Name -and $_.Current.Name -like \"*$buttonName*\" } | Select-Object -First 1)",
        "if ($control.Count -eq 0) { \"Error: No control matched: $buttonName\"; exit 0 }",
        "$chosen = $control[0]",
        "try { $invoke = $chosen.GetCurrentPattern([System.Windows.Automation.InvokePattern]::Pattern); $invoke.Invoke(); \"Clicked: $($chosen.Current.Name) in $($window.Current.Name)\" } catch { \"Error: $($chosen.Current.Name) cannot be clicked. $($_.Exception.Message)\" }",
      ].join("\n"),
  ].join("\n");
}

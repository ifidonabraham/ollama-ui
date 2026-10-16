Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;
public class WinUtil {
    [DllImport("user32.dll")]
    public static extern bool EnumWindows(EnumWindowsProc lpEnumFunc, IntPtr lParam);
    public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);
    [DllImport("user32.dll")]
    public static extern uint GetWindowThreadProcessId(IntPtr hWnd, out uint lpdwProcessId);
    [DllImport("user32.dll", CharSet = CharSet.Auto)]
    public static extern int GetWindowText(IntPtr hWnd, System.Text.StringBuilder lpString, int nMaxCount);
    [DllImport("user32.dll")]
    public static extern bool IsWindowVisible(IntPtr hWnd);
}
"@

$targetPids = (Get-Process -Name 'fonia_app' -ErrorAction SilentlyContinue).Id
[WinUtil]::EnumWindows({
    param($hwnd, $lparam)
    $pidOut = [uint32]0
    [WinUtil]::GetWindowThreadProcessId($hwnd, [ref]$pidOut)
    if ($targetPids -contains $pidOut) {
        $sb = [System.Text.StringBuilder]::new(256)
        [WinUtil]::GetWindowText($hwnd, $sb, 256)
        $vis = [WinUtil]::IsWindowVisible($hwnd)
        Write-Host ("HWND: " + $hwnd + " PID: " + $pidOut + " Visible: " + $vis + " Title: '" + $sb.ToString() + "'")
    }
    return $true
}, [IntPtr]::Zero)

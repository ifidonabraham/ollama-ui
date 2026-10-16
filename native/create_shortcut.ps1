$desktop = [Environment]::GetFolderPath('Desktop')
$shortcutPath = Join-Path $desktop "Fonia.lnk"
$targetPath = "C:\Users\PC\A.I projects\ollama-ui\native\bin\fonia_app.exe"
$workDir = "C:\Users\PC\A.I projects\ollama-ui\native"

$wsh = New-Object -ComObject WScript.Shell
$sc = $wsh.CreateShortcut($shortcutPath)
$sc.TargetPath = $targetPath
$sc.WorkingDirectory = $workDir
$sc.Description = "Fonia DWM AI Operating System"
$sc.Save()

Write-Host "Created Desktop Shortcut: $shortcutPath"

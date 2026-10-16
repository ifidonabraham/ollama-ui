$p = New-Object System.Diagnostics.Process
$p.StartInfo.FileName = "C:\Users\PC\A.I projects\ollama-ui\native\bin\fonia_app.exe"
$p.StartInfo.UseShellExecute = $false
$p.StartInfo.RedirectStandardOutput = $true
$p.StartInfo.RedirectStandardError = $true
$p.Start() | Out-Null
$p.WaitForExit(5000) | Out-Null
Write-Host "HasExited: $($p.HasExited)"
Write-Host "ExitCode: $($p.ExitCode)"
$stdout = $p.StandardOutput.ReadToEnd()
$stderr = $p.StandardError.ReadToEnd()
Write-Host "Stdout: $stdout"
Write-Host "Stderr: $stderr"

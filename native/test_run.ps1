$proc = Start-Process -FilePath "C:\Users\PC\A.I projects\ollama-ui\native\bin\fonia_app.exe" -PassThru
Start-Sleep -Seconds 1
Write-Host "Process ID: $($proc.Id)"
Write-Host "HasExited: $($proc.HasExited)"
if ($proc.HasExited) {
    Write-Host "ExitCode: $($proc.ExitCode)"
}

$ErrorActionPreference='Stop'
Set-Location -LiteralPath $PSScriptRoot
$localPg = Join-Path $PSScriptRoot '.runtime\postgresql\pgsql\bin\pg_ctl.exe'
$pgReady = Join-Path $PSScriptRoot '.runtime\postgresql\pgsql\bin\pg_isready.exe'
$localData = Join-Path $PSScriptRoot '.runtime\postgres-data'
$envFile = Join-Path $PSScriptRoot '.env'
if ((Test-Path $localPg) -and (Test-Path $pgReady) -and (Test-Path $localData) -and (Test-Path $envFile)) {
    $databaseLine = Get-Content -LiteralPath $envFile | Where-Object { $_ -match '^DATABASE_URL=' } | Select-Object -Last 1
    if ($databaseLine -match '@127\.0\.0\.1:56432/') {
        & $pgReady -h 127.0.0.1 -p 56432 -q
        if ($LASTEXITCODE -ne 0) {
            $postgres = Join-Path (Split-Path $localPg) 'postgres.exe'
            $log = Join-Path $PSScriptRoot '.runtime\postgresql\server.log'
            $stderr = Join-Path $PSScriptRoot '.runtime\postgresql\startup-error.log'
            $pgProcess = Start-Process -FilePath $postgres -ArgumentList @('-D', ('"' + $localData + '"'), '-p', '56432', '-h', '127.0.0.1') -WorkingDirectory (Split-Path $localPg) -WindowStyle Hidden -RedirectStandardOutput $log -RedirectStandardError $stderr -PassThru
            $ready = $false
            for ($attempt = 0; $attempt -lt 45; $attempt++) {
                Start-Sleep -Seconds 1
                & $pgReady -h 127.0.0.1 -p 56432 -q
                if ($LASTEXITCODE -eq 0) { $ready = $true; break }
                if ($pgProcess.HasExited) { break }
            }
            if (-not $ready) {
                $detail = if (Test-Path $stderr) { (Get-Content $stderr -Raw).Trim() } else { '' }
                if (-not $detail -and (Test-Path $log)) { $detail = (Get-Content $log -Tail 20 | Out-String).Trim() }
                throw ('Local PostgreSQL did not become ready. ' + $detail)
            }
        }
    }
}
$localDeps = Join-Path $PSScriptRoot '.runtime-deps'
if (Test-Path $localDeps) { $env:PYTHONPATH = "$localDeps$([IO.Path]::PathSeparator)$env:PYTHONPATH" }
python server.py

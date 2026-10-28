param(
    [string]$PublicBaseUrl = 'http://127.0.0.1:4173',
    [switch]$SmtpOnly
)

$ErrorActionPreference = 'Stop'
Set-Location -LiteralPath $PSScriptRoot

$origin = $null
if (-not [Uri]::TryCreate($PublicBaseUrl, [UriKind]::Absolute, [ref]$origin) -or
    $origin.AbsoluteUri.TrimEnd('/') -ne $PublicBaseUrl.TrimEnd('/') -or
    $origin.AbsolutePath -ne '/' -or $origin.Query -or $origin.Fragment -or $origin.UserInfo -or
    ($origin.Scheme -ne 'https' -and $PublicBaseUrl -ne 'http://127.0.0.1:4173')) {
    throw 'PublicBaseUrl must be an HTTPS origin, or http://127.0.0.1:4173 for local verification.'
}

$existing = if (Test-Path -LiteralPath (Join-Path $PSScriptRoot '.env')) { [IO.File]::ReadAllLines((Join-Path $PSScriptRoot '.env')) } else { @() }
$existingValues = @{}
foreach ($line in $existing) {
    if ($line -match '^([^#=\s]+)=(.*)$') { $existingValues[$Matches[1]] = $Matches[2].Trim().Trim('"').Trim("'") }
}

$clientId = $existingValues['CALMA_GOOGLE_OAUTH_CLIENT_ID']
$clientSecret = $existingValues['CALMA_GOOGLE_OAUTH_CLIENT_SECRET']
if (-not $SmtpOnly) {
    Write-Host ('Register Google OAuth redirect URI: ' + $PublicBaseUrl.TrimEnd('/') + '/api/auth/google/callback')
    $clientId = (Read-Host 'Google OAuth Web client ID').Trim()
    $clientSecretSecure = Read-Host 'Google OAuth client secret' -AsSecureString
    $clientSecret = [System.Net.NetworkCredential]::new('', $clientSecretSecure).Password
}
$gmailAddress = (Read-Host 'Gmail sending address').Trim().ToLowerInvariant()
$appPasswordSecure = Read-Host 'Gmail app password' -AsSecureString
$appPassword = [System.Net.NetworkCredential]::new('', $appPasswordSecure).Password.Replace(' ', '')

if (-not $SmtpOnly -and $clientId -notmatch '^[A-Za-z0-9_-]+\.apps\.googleusercontent\.com$') { throw 'Google OAuth Web client ID is invalid.' }
if (-not $SmtpOnly -and $clientSecret.Length -lt 8) { throw 'Google OAuth client secret is missing.' }
if ($SmtpOnly -and ((-not $clientId) -or (-not $clientSecret))) { throw 'Existing Google OAuth credentials are missing; run without -SmtpOnly first.' }
if ($gmailAddress -notmatch '^[^@\s]+@[^@\s]+\.[^@\s]+$') { throw 'Gmail sending address is invalid.' }
if ($appPassword -notmatch '^[A-Za-z0-9]{16}$') { throw 'Gmail app password must be 16 letters or digits.' }
foreach ($value in @($clientId, $clientSecret, $gmailAddress, $appPassword)) {
    if ($value.Contains("`n") -or $value.Contains("`r")) { throw 'Credential contains a newline.' }
}

$envPath = Join-Path $PSScriptRoot '.env'
$updates = [ordered]@{}
if (-not $SmtpOnly) {
    $updates['CALMA_PUBLIC_BASE_URL'] = $PublicBaseUrl.TrimEnd('/')
    $updates['CALMA_GOOGLE_OAUTH_CLIENT_ID'] = $clientId
    $updates['CALMA_GOOGLE_OAUTH_CLIENT_SECRET'] = $clientSecret
}
$updates['CALMA_AUTH_SMTP_HOST'] = 'smtp.gmail.com'
$updates['CALMA_AUTH_SMTP_PORT'] = '587'
$updates['CALMA_AUTH_SMTP_STARTTLS'] = 'true'
$updates['CALMA_AUTH_SMTP_USER'] = $gmailAddress
$updates['CALMA_AUTH_SMTP_PASSWORD'] = $appPassword
$updates['CALMA_AUTH_FROM_EMAIL'] = $gmailAddress
$updated = [System.Collections.Generic.List[string]]::new()
foreach ($line in $existing) {
    $key = ($line -split '=', 2)[0].Trim()
    if (-not $updates.Contains($key)) { $updated.Add($line) }
}
foreach ($key in $updates.Keys) { $updated.Add($key + '=' + $updates[$key]) }
$runtime = Join-Path $PSScriptRoot '.runtime'
[IO.Directory]::CreateDirectory($runtime) | Out-Null
$temporary = Join-Path $runtime ('auth-env-' + [Guid]::NewGuid().ToString('N') + '.tmp')
try {
    [IO.File]::WriteAllLines($temporary, $updated, [Text.UTF8Encoding]::new($false))
    Copy-Item -LiteralPath $temporary -Destination $envPath -Force
} finally {
    if (Test-Path -LiteralPath $temporary) { Remove-Item -LiteralPath $temporary }
}

Write-Host 'Credentials saved to local .env. Restart Calma, then check Google login and password recovery.'

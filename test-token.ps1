$token = "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"
$headers = @{
    "Authorization" = "token $token"
    "Accept" = "application/vnd.github.v3+json"
}

try {
    $response = Invoke-WebRequest -Uri "https://api.github.com/user" -Method Get -Headers $headers
    $user = $response.Content | ConvertFrom-Json
    Write-Host "✓ Token is VALID"
    Write-Host "Authenticated as: $($user.login)"
    Write-Host "Public repos: $($user.public_repos)"
} catch {
    Write-Host "✗ Token is INVALID or EXPIRED"
    Write-Host "Error: $($_.Exception.Message)"
}

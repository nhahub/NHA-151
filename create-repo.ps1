$token = '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'
$auth = 'token ' + $token
$headers = @{
    'Authorization' = $auth
    'Accept' = 'application/vnd.github+json'
}

$body = @{
    'name' = 'greenify-depi'
    'description' = 'Full-stack e-commerce platform for plants and gardening products'
    'private' = $false
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri 'https://api.github.com/user/repos' -Method POST -Headers $headers -Body $body -ContentType 'application/json'

Write-Host "Repository created!"
Write-Host "Name: $($response.name)"
Write-Host "URL: $($response.html_url)"
Write-Host "ID: $($response.id)"

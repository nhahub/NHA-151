$token = "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"
$headers = @{
    "Authorization" = "token $token"
    "Accept" = "application/vnd.github.v3+json"
}

$body = @{
    name = "greenify-depi"
    description = "Full-stack e-commerce platform for plants and gardening products"
    private = $false
    auto_init = $false
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $body -ContentType "application/json"
    $repo = $response.Content | ConvertFrom-Json
    Write-Host "Repository created successfully!"
    Write-Host "Name: $($repo.name)"
    Write-Host "URL: $($repo.html_url)"
    Write-Host "Clone URL: $($repo.clone_url)"
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    Write-Host "Response: $($_.Exception.Response.StatusCode)"
}

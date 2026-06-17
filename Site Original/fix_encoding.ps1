$content = Get-Content -Path "App.tsx" -Encoding UTF8 -Raw
$content = $content -replace '// .*cones Minimalistas', '// Ícones Minimalistas'
$content = $content -replace 'title: ".*rea de Membros Pro"', 'title: "Área de Membros Pro"'
$content = $content -replace 'aplicados .* experiência', 'aplicados à experiência'
$content = $content -replace 'SEGURAN.*A - ENHANCED', 'SEGURANÇA - ENHANCED'
$content | Set-Content -Path "App.tsx" -Encoding UTF8
Write-Host "Fixed encoding issues."

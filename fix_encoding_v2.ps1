$path = "App.tsx"
$txt = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# Regex replacements to bypass corrupted characters
$txt = $txt -replace '// .* Minimalistas Premium', '// Ícones Minimalistas Premium'
$txt = $txt -replace 'title: ".* de Membros Pro"', 'title: "Área de Membros Pro"'
$txt = $txt -replace 'aplicados .* experiência', 'aplicados à experiência'
$txt = $txt -replace 'SECTION 10: INFRA & .* - ENHANCED', 'SECTION 10: INFRA & SEGURANÇA - ENHANCED'

[System.IO.File]::WriteAllText($path, $txt, [System.Text.Encoding]::UTF8)
Write-Host "Applied V2 encoding fixes."

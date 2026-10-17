#Requires -Version 7.0
param(
    [string]$OutputDirectory
)

$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path $PSScriptRoot -Parent
$outputRoot = if ($OutputDirectory) {
    [IO.Path]::GetFullPath($OutputDirectory)
} else {
    Join-Path (Split-Path $repoRoot -Parent) 'Clash-Verge-Rhine-Windows-x64'
}
$releaseRoot = Join-Path $repoRoot 'target\release'
New-Item -ItemType Directory -Path $outputRoot -Force | Out-Null
foreach ($name in @('clash-verge.exe', 'verge-mihomo.exe', 'verge-mihomo-alpha.exe')) {
    Copy-Item -LiteralPath (Join-Path $releaseRoot $name) -Destination (Join-Path $outputRoot $name) -Force
}
Copy-Item -LiteralPath (Join-Path $releaseRoot 'resources') -Destination $outputRoot -Recurse -Force
Copy-Item -LiteralPath (Join-Path $repoRoot 'LICENSE') -Destination $outputRoot -Force
Copy-Item -LiteralPath (Join-Path $repoRoot 'RHINE-EDITION.md') -Destination $outputRoot -Force
Copy-Item -LiteralPath (Join-Path $repoRoot 'docs\RHINE-使用说明.md') -Destination (Join-Path $outputRoot '使用说明.md') -Force
@'
@echo off
setlocal
set "CLASH_RHINE_PREVIEW="
start "" "%~dp0clash-verge.exe"
'@ | Set-Content -LiteralPath (Join-Path $outputRoot '启动 Rhine.cmd') -Encoding ascii
@'
@echo off
setlocal
set "CLASH_RHINE_PREVIEW=1"
start "" "%~dp0clash-verge.exe"
'@ | Set-Content -LiteralPath (Join-Path $outputRoot '隔离预览.cmd') -Encoding ascii
$manifest = Get-ChildItem -LiteralPath $outputRoot -File -Recurse | Where-Object { $_.Name -ne 'SHA256.json' } | ForEach-Object {
    $hash = Get-FileHash -LiteralPath $_.FullName -Algorithm SHA256
    [pscustomobject]@{ path = [IO.Path]::GetRelativePath($outputRoot, $_.FullName); bytes = $_.Length; sha256 = $hash.Hash }
}
$manifest | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $outputRoot 'SHA256.json') -Encoding utf8
Write-Output $outputRoot

$resourceGroup = "azure-app-to-app-auth-demo-rg";
$frontendApplicationName = "azure-app-to-app-auth-demo-client"
$pacakgeName = "client"

if (!(Test-Path ".\deploy")){
    New-Item -ItemType Directory -Path .\deploy
}

# CD into front end application
$currentLocation = Get-Location
Set-Location .\src\frontend

# Install packages
npm i

# Build application
npm run build

# Create archive of dist folder
Compress-Archive -Path .\dist\* -DestinationPath ..\..\deploy\$pacakgeName.zip -Force

# CD to root directory
Set-Location $currentLocation

# ZIP deploy the web app
az webapp deploy --resource-group $resourceGroup --name $frontendApplicationName --src-path .\deploy\$pacakgeName.zip --type zip --async true


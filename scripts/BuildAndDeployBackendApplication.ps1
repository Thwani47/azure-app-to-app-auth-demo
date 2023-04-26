$resourceGroup = "azure-app-to-app-auth-demo-rg";
$apiApplicationName = "azure-app-to-app-auth-demo-api"
$pacakgeName = "TodoApi"

if (!(Test-Path ".\deploy")){
    New-Item -ItemType Directory -Path .\deploy
}

# build application
dotnet build .\src\TodoApi\TodoApi.csproj

# publish api 
dotnet publish .\src\TodoApi\TodoApi.csproj --no-restore -o .\deploy\$pacakgeName

Compress-Archive -Path .\deploy\$pacakgeName\* -DestinationPath .\deploy\$pacakgeName.zip -Force

# ZIP deploy the web app
az webapp deploy --resource-group $resourceGroup --name $apiApplicationName --src-path .\deploy\$pacakgeName.zip --type zip --async true


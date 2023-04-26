$resourceGroup = "azure-app-to-app-auth-demo-rg";
$location = "eastus";
$clientAppServicePlanName = "azure-app-to-app-auth-demo-client-sp";
$apiAppServicePlanName = "azure-app-to-app-auth-demo-api-sp";
$frontendApplicationName = "azure-app-to-app-auth-demo-client"
$apiWebAppName = "azure-app-to-app-auth-demo-api"


# Create the resource group
az group create --name $resourceGroup --location $location

# Create the app service plan
az appservice plan create --name $clientAppServicePlanName --resource-group $resourceGroup --sku free
az appservice plan create --name $apiAppServicePlanName --resource-group $resourceGroup --sku free

# Create the front end app service
az webapp create --name $frontendApplicationName --resource-group $resourceGroup --plan $clientAppServicePlanName

# Set the node version
az webapp config appsettings set --name $frontendApplicationName --resource-group $resourceGroup --settings WEBSITE_NODE_DEFAULT_VERSION="~16"

# set the start up command
az webapp config set --name $frontendApplicationName --resource-group $resourceGroup --startup-file "pm2 serve /home/site/wwwroot/ --spa --no-daemon"


# Create the api app service
az webapp create --name $apiWebAppName --resource-group $resourceGroup --plan $apiAppServicePlanName
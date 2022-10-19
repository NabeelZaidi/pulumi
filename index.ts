import * as pulumi from "@pulumi/pulumi";
import * as resources from "@pulumi/azure-native/resources";
import * as storage from "@pulumi/azure-native/storage";
import * as azure_native from "@pulumi/azure-native";
import * as web from "@pulumi/azure-native/web";
import { keyvault } from "@pulumi/azure-native/types/enums";
import * as azure from "@pulumi/azure";

// //Get Current Configuration
// const current = azure_native.authorization.getClientConfig();
// const currentcore = azure.core.getClientConfig({});

//GetSQLDatabase
const config = new pulumi.Config();
const confignative = new pulumi.Config('azure-native');
const KeyVaultName = config.require("KeyVaultName");
const tenantIdvalue = confignative.require("tenantId");
const objectIdvalue = confignative.require("objectId");

// // Get SQL Database
// export const SqlDatabaseConnectionString = pulumi.interpolate`Server=tcp:${SqlServerName}.database.windows.net,1433;Initial Catalog=${SqlServerDBName};Persist Security Info=False;User ID=${UserId};Password=${Password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;`


// Create an Azure Resource Group
const resourceGroup = new resources.ResourceGroup("resourceGroup",{
    resourceGroupName: "testnabeel2"
});

// Create an Azure resource (Storage Account)
const storageAccount = new storage.StorageAccount("sanab", {
    accountName: "testnabestorage",
    resourceGroupName: resourceGroup.name,
    sku: {
        name: storage.SkuName.Standard_LRS,
    },
    kind: storage.Kind.StorageV2,
});

// // Export the primary key of the Storage Account
// const storageAccountKeys = storage.listStorageAccountKeysOutput({
//     resourceGroupName: resourceGroup.name,
//     accountName: storageAccount.name
// });

// export const primaryStorageKey = storageAccountKeys.keys[0].value;
// console.log(primaryStorageKey)
// console.log(current)



// //Below Code is for testing purpose
// // Create App Service Plan
// const appServicePlan = new web.AppServicePlan("asp", {
//     resourceGroupName: resourceGroup.name,
//     kind: "App",
//     sku: {
//         name: "B1",
//         tier: "Basic",
//     },
// });

// // Create App Service
// let app = new web.WebApp("webapp", {
//     resourceGroupName: resourceGroup.name,
//     serverFarmId: appServicePlan.id,
//     siteConfig: {
//         appSettings: [
//             {
//                 name: "ApplicationInsightsAgent_EXTENSION_VERSION",
//                 value: "~2",
//             }
//         ],
//         connectionStrings: [{
//             name: "db",
//             connectionString:
//                 pulumi.all([SqlServerName, SqlServerDBName]).apply(([server, db]) =>
//                     `Server=tcp:${server}.database.windows.net;initial catalog=${db};user ID=${UserId};password=${Password};Min Pool Size=0;Max Pool Size=30;Persist Security Info=true;`),
//             type: web.ConnectionStringType.SQLAzure,
//         }],
//     },
//     identity: {
//         type: "SystemAssigned"
//     },
// });


// //Get Object ID of the identity. This is  a workaround for the code
// export const appprincipalid = app.identity.apply(id => id?.principalId || "11111111-1111-1111-1111-111111111111");
// console.log(appprincipalid)

// Azure Keyvault

// const vault = new azure_native.keyvault.Vault("vault", {
//     properties: {
//         accessPolicies: [{
//             objectId: objectIdvalue,
//             permissions: {
//                 certificates: [
//                     "get",
//                     "list",
//                     "delete",
//                     "create",
//                     "import",
//                     "update",
//                     "managecontacts",
//                     "getissuers",
//                     "listissuers",
//                     "setissuers",
//                     "deleteissuers",
//                     "manageissuers",
//                     "recover",
//                     "purge",
//                 ],
//                 keys: [
//                     "encrypt",
//                     "decrypt",
//                     "wrapKey",
//                     "unwrapKey",
//                     "sign",
//                     "verify",
//                     "get",
//                     "list",
//                     "create",
//                     "update",
//                     "import",
//                     "delete",
//                     "backup",
//                     "restore",
//                     "recover",
//                     "purge",
//                 ],
//                 secrets: [
//                     "get",
//                     "list",
//                     "set",
//                     "delete",
//                     "backup",
//                     "restore",
//                     "recover",
//                     "purge",
//                 ],
//             },
//             tenantId: tenantIdvalue,
//         },
//     ],
//         enabledForDeployment: true,
//         enabledForDiskEncryption: true,
//         enabledForTemplateDeployment: true,
//         sku: {
//             family: "A",
//             name: azure_native.keyvault.SkuName.Standard,
//         },
//         tenantId: tenantIdvalue,
//     },
//     resourceGroupName: resourceGroup.name,
//     vaultName: KeyVaultName,
// });


// // const SqlDbSecretUri = pulumi.interpolate`@Microsoft.KeyVault(SecretUri=https://${vault.name}.vault.azure.net/secrets/${secret.name})`

// // const connectionStringreference = new web.WebAppConnectionStrings("conns", {
// //     resourceGroupName: resourceGroup.name,
// //     name: app.name,
// //     properties: {
// //         dbnab: {
// //             value: SqlDbSecretUri,
// //             type: "SQLAzure",
// //         },
// //     },
// // });

// // const KeyvaultId = pulumi.interpolate`/subscriptions/${subscriptionId}/resourceGroups/${resourceGroup.name}/providers/Microsoft.KeyVault/vaults/${KeyVaultName}`

// // const exampleAccessPolicy = new azure.keyvault.AccessPolicy("exampleAccessPolicy", {
// //     keyVaultId: KeyvaultId,
// //     tenantId: currentcore.then(currentcore => currentcore.tenantId),
// //     objectId: currentcore.then(currentcore => currentcore.objectId),
// //     keyPermissions: ["Get"],
// //     secretPermissions: ["Get"],
// // });

// // export const Keyvaultidtest = KeyvaultId;
// // console.log(Keyvaultidtest)

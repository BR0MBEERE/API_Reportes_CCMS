import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials/index.js";

const clientId = "578b9bbe-5fc3-45dc-aa10-3679dbcb4602"
const clientSecret = "Wao8Q~EwHDuJUY9.r1IInOTr7CoSO3gx01.l3akF"
const tenantId = "5cb7966b-5a33-4f92-8574-71f78d45cf05"

const scopes = ['https://graph.microsoft.com/.default'];
// Define the scopes that your app requires
// const scopes = ["user.read"];


const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    scopes: scopes
});

const client = Client.initWithMiddleware({
    debugLogging: true,
    authProvider
    // Use the authProvider object to create the class.
});
// Make a request to get the current user's profile

client.loginRedirect()
    .then(() => {
        console.log('Access token:', client.getAccessToken());
        client.api('/me').get()
            .then((res) => {
                console.log('User data:', res);
            })
            .catch((err) => {
                console.error(err);
            });
    })
    .catch((err) => {
        console.error(err);
    });



// // Create an instance of the TokenCredential class that is imported
// const tokenCredential = new ClientSecretCredential(tenantId, clientId, clientSecret);

// // Set your scopes and options for TokenCredential.getToken (Check the ` interface GetTokenOptions` in (TokenCredential Implementation)[https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/core/core-auth/src/tokenCredential.ts])

// const options = { scopes: scopes };

// // Create an instance of the TokenCredentialAuthenticationProvider by passing the tokenCredential instance and options to the constructor
// const authProvider = new TokenCredentialAuthenticationProvider(tokenCredential, options);
// const client = Client.initWithMiddleware({
// 	debugLogging: true,
// 	authProvider: authProvider,
// });
// const res = await client.api("/me").get();

// console.log(res)

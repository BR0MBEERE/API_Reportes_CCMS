import { ClientSecretCredential } from "@azure/identity";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials/index.js";

    const clientId = process.env.CLIENT_ID
    const clientSecret = process.env.CLIENT_SECRET
    const tenantId = process.env.TENANT_ID

// Define the scopes that your app requires
const scopes = ['https://graph.microsoft.com/.default'];

const credential = new ClientSecretCredential(tenantId, clientId, clientSecret);
const authProvider = new TokenCredentialAuthenticationProvider(credential, {
    scopes: scopes
});

export const client = Client.initWithMiddleware({
    debugLogging: true,
    authProvider
});



// export const getToken = async ()=>{
//     const clientId = process.env.CLIENT_ID
//     const clientSecret = process.env.CLIENT_SECRET
//     const tenantId = process.env.TENANT_ID
//     const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    
//     const response = await fetch(tokenEndpoint, {
//         method: 'POST',
//         headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: new URLSearchParams({
//         grant_type: 'client_credentials',
//         client_id: clientId,
//         client_secret: clientSecret,
//         scope: 'https://graph.microsoft.com/.default'
//         })
//     });
//     if (response.ok) {
//         const data = await response.json();
//         const accessToken = data.access_token;
//         return accessToken;
//     } else {
//         console.log(`Error getting access token: ${response.status} ${response.statusText}`);
//         return null;
//     }
// }

// export const getTokenAuth = async () => {
//     try {
//         const tokenRequest = await fetch('/.auth/me');
//         const tokenResponse = await tokenRequest.json();
//         const accessToken = tokenResponse[0].access_token;
//         return accessToken;
//     } catch (error) {
//         console.error('Failed to get access token', error);
//         return null;
//     }
// }
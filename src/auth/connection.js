export const getToken = async ()=>{
    const clientId = process.env.CLIENT_ID
    const clientSecret = process.env.CLINET_SECRET
    const tenantId = process.env.TENANT_ID
    const tokenEndpoint = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
    
    const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret,
        scope: 'https://graph.microsoft.com/.default'
        })
    });
    if (response.ok) {
        const data = await response.json();
        const accessToken = data.access_token;
        return accessToken;
    } else {
        console.log(`Error getting access token: ${response.status} ${response.statusText}`);
        return null;
    }
}
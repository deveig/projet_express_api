import { createClient } from 'redis';
export default async function getClient() {
    const client = createClient();

    client.on('error', err => console.log('Redis Client Error', err));

    const isConnected = await client.connect();

    if(isConnected) {
        console.log('Connexion à Redis réussie !');
    } else {
        console.log('Connexion à Redis échouée !');
    }
    return client;
}

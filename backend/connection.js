import { createClient } from "redis";
import { config } from 'dotenv';
config();

export default async function getClient() {
  const dbUrl = process.env.DB_KEY;
  const client = createClient({
    url: dbUrl
  });

  client.on("error", (err) => console.log("Redis Client Error", err));

  const isConnected = await client.connect();

  if (isConnected) {
    console.log("Connexion à Redis réussie !");
  } else {
    console.log("Connexion à Redis échouée !");
  }
  return client;
}

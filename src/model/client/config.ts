import { Client, Account,Avatars,Storage,Databases } from "appwrite";
import env from "@/app/env";
const client = new Client()
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId); // Your project ID

const account = new Account(client);
const avatar = new Avatars(client);
const database = new Databases(client);
const storage = new Storage(client);

export {
    client,
    account,
    avatar,
    database,
    storage
}
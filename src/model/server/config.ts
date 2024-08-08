import {Avatars,Storage,Client,Databases, Users} from "node-appwrite"
import env from "@/app/env";

let client = new Client();

client
    .setEndpoint(env.appwrite.endpoint) // Your API Endpoint
    .setProject(env.appwrite.projectId) // Your project ID
    .setKey(env.appwrite.apikey) // Your secret API key
;


const users = new Users(client)
const avatar = new Avatars(client);
const database = new Databases(client);
const storage = new Storage(client);

export {
    client,
    users,
    avatar,
    database,
    storage
}
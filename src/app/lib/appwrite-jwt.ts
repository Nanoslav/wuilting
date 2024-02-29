import {Client, Databases, Functions, Users} from 'node-appwrite';

const appwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const appwriteProject = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;

export const client = new Client();

if (appwriteEndpoint && appwriteProject) {
    client
        .setEndpoint(appwriteEndpoint)
        .setProject(appwriteProject)
} else {
    console.error("Please make sure APPWRITE_ENDPOINT APPWRITE_PROJECT are defined in your environment variables.");
}

export const users = new Users(client);
export const database = process.env.NEXT_PUBLIC_APPWRITE_DB_NAME ?? 'appwrite'
export const databases = new Databases(client);
export const functions = new Functions(client)
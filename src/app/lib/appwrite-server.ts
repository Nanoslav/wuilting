import { Client, Databases, Functions } from 'node-appwrite';

const appwriteEndpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const appwriteProject = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
const appwriteKey = process.env.APPWRITE_KEY;

export const client = new Client();

if (appwriteEndpoint && appwriteProject && appwriteKey) {
    client
        .setEndpoint(appwriteEndpoint)
        .setProject(appwriteProject)
        .setKey(appwriteKey);
} else {
    console.error("Please make sure APPWRITE_ENDPOINT APPWRITE_PROJECT APPWRITE_KEY are defined in your environment variables.");
}

export const database = process.env.NEXT_PUBLIC_APPWRITE_DB_NAME ?? 'appwrite'
export const databases = new Databases(client);
export const functions = new Functions(client)
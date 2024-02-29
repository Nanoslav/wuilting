import {NextApiRequest, NextApiResponse} from 'next';
import {ID, Permission, Role} from 'node-appwrite';
import {client, database, databases} from "@/app/lib/appwrite-jwt";
import {Query} from "appwrite";

const saveWuilting = async ({ word, words, author, date, isSaved } : { word: string, words: number, author: string, date: Date, isSaved: string }) => {
    try {
        if(isSaved){
            await databases.deleteDocument(database, 'wuilting_history', isSaved);
        }

        await databases.createDocument(
            database,
            'wuilting_history',
            ID.unique(),
            {
                word: word,
                words: words,
                author: author,
                date: date
            },
            [
                Permission.read(Role.any()),
                Permission.update(Role.team("admin")),
                Permission.delete(Role.team("admin")),
            ]
        );
    } catch (error) {
        console.error('Error saving wuilting:', error);
        throw error;
    } finally {
        client.setJWT("");
    }
};

export async function POST(req: Request, res: NextApiResponse) {
    try {
        const reqRes = await req.json()
        let { word, words, jwt, author, date, isSaved } = reqRes

        if (!word || !words || !jwt || !author || !date) {
            return Response.json({ error: 'Invalid request body' }, { status: 400 })
        }

        client.setJWT(jwt.jwt);

        const result = await saveWuilting({ word, words, author, date, isSaved });

        return Response.json({ result })
    } catch (error) {
        console.error('Error saving wuilting:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

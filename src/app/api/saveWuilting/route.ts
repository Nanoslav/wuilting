import {NextApiRequest, NextApiResponse} from 'next';
import {ID, Permission, Role} from 'node-appwrite';
import {client, database, databases} from "@/app/lib/appwrite-jwt";

const saveWuilting = async ({ word, words, author, date } : { word: string, words: number, author: string, date: Date }) => {
    try {
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
        // TODO: Remove words in the wuilting collection which were replaced by this record
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
        let { word, words, jwt, author, date } = reqRes

        if (!word || !words || !jwt || !author || !date) {
            return Response.json({ error: 'Invalid request body' }, { status: 400 })
        }

        client.setJWT(jwt.jwt);

        const result = await saveWuilting({ word, words, author, date });

        return Response.json({ result })
    } catch (error) {
        console.error('Error saving wuilting:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

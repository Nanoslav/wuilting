import {NextApiRequest, NextApiResponse} from 'next';
import {ID, Permission, Role} from 'node-appwrite';
import {client, database, databases} from "@/app/lib/appwrite-jwt";

const saveWuilting = async ({ text, words } : { text: string, words: number }) => {
    try {
        return await databases.createDocument(
            database,
            'wuilting_history',
            ID.unique(),
            {
                text: text,
                words: words,
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
        let { text, words, jwt } = reqRes

        if (!text || !words || !jwt) {
            return Response.json({ error: 'Invalid request body' }, { status: 400 })
        }

        client.setKey(jwt);

        const result = await saveWuilting({ text, words });

        return Response.json({ result })
    } catch (error) {
        console.error('Error saving wuilting:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

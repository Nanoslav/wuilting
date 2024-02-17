import { NextApiRequest } from 'next';
import {database, databases} from "@/app/lib/appwrite-server";
const getUser = async (id: string) => {
    if(!database) return null;
    try {
        const result = await databases.getDocument(database, 'users', id);

        if (result) {
            return result;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error getting user:', error);
        throw error;
    }
};

export async function GET(req: NextApiRequest, context: {params: {id: string}}, res: Response) {

    try {
        const id = context.params.id

        if (!id) {
            return Response.json({ error: 'id is required' }, { status: 400 })
        }

        const user = await getUser(id);

        if (user) {
            return Response.json({ user })
        } else {
            return Response.json({ error: 'User not found' }, { status: 404 })
        }
    } catch (error) {
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
};

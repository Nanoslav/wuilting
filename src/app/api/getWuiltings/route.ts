import {databases} from "@/app/lib/appwrite-server";
import WuiltingObject from "@/app/utils/interfaces/Wuilting";
import {Query} from "node-appwrite";
import {NextApiRequest} from "next";

const fetchData = async (amount: number) => {

    const documents = await databases.listDocuments(
        "wuilting",
        "wuilting",
        [
            Query.orderDesc("$id"),
            Query.limit(5),
        ],
    );
    return documents.documents as unknown as WuiltingObject[];
}

export async function GET(req: NextApiRequest, context: {params: {startDate: string}}, res: Response) {
    try {
        const amount = 5
        const wuiltings = await fetchData(amount);

        if (wuiltings) {
            return Response.json(wuiltings)
        } else {
            return Response.json({ error: 'Wuiltings not found' }, { status: 404 })
        }
    } catch (error) {
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

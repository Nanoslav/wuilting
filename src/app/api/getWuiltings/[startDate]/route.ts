import {databases} from "@/app/lib/appwrite-server";
import WuiltingObject from "@/app/utils/interfaces/Wuilting";
import {Query} from "node-appwrite";

const fetchData = async (startDate: string) => {

    const decodedDateString = decodeURIComponent(startDate);
    const date = new Date(decodedDateString);

    const start = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString();
    const end = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59).toISOString();

    const historyDocuments = await databases.listDocuments(
        "wuilting",
        "wuilting_history",
        [
            Query.between("date", start, end),
            Query.limit(1),
        ],
    );

    if(historyDocuments.documents.length > 0) {
        return historyDocuments.documents as unknown as WuiltingObject[];
    }

    const documents = await databases.listDocuments(
        "wuilting",
        "wuilting",
        [
            Query.between("$createdAt", start, end),
            Query.limit(1000),
        ],
    );
    return documents.documents as unknown as WuiltingObject[];
}

export async function GET(context: {params: {startDate: string}}) {

    try {
        const startDate = context.params.startDate

        if (!startDate) {
            return Response.json({ error: 'startDate is required' }, { status: 400 })
        }

        const wuiltings = await fetchData(startDate);

        if (wuiltings) {
            return Response.json(wuiltings)
        } else {
            return Response.json({ error: 'Wuilting not found' }, { status: 404 })
        }
    } catch (error) {
        return Response.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}

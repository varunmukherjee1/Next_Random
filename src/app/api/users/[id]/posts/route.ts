import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
import { NextApiRequest} from "next";

export const GET = async (req: NextApiRequest, {params}) => {
    try {
        await connectToDB()

        const pid = params.id;
        const prompts = await Prompt.find({ creator: pid }).populate("creator")

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch prompts created by usergand mara", { status: 500 })
    }
} 
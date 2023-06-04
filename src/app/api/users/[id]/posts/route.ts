import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
import { NextApiRequest} from "next";

export const GET = async (req: NextApiRequest) => {
    try {
        await connectToDB()

        console.log(req.query.id);
        const pid = req.query.id;
        const prompts = await Prompt.find({ creator: pid }).populate("creator")

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500 })
    }
} 
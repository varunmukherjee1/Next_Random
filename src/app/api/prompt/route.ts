import { connectToDB } from "@/utils/database"
import Prompt from "@/models/prompt"

export const GET = async (req:Request) => {
    try {
        await connectToDB();

        const res = await Prompt.find().populate('creator');

        return new Response(
            JSON.stringify(res),
            {
                status: 200
            }
        )

    } catch (error) {
        console.log("Prompts fetch error");

        return new Response(
            "Failed to fetch prompts",
            {
                status: 500
            }
        )
    }
}
import Prompt from "@/models/prompt"
import { connectToDB } from "@/utils/database"
import { NextApiRequest} from "next";
//@ts-ignore
export const GET = async (req: NextApiRequest, {params}) => {
    try {
        await connectToDB();

        const pid = params.id;

        const res = await Prompt.findOne({_id: pid}).populate('creator')
        if(!res){
            return new Response(
                "Prompt Not Found!",
                {status: 404}
            )
        }

        return new Response(
            JSON.stringify(res),
            {status: 200}
        )

    } catch (error) {
        console.log(error);
        return new Response(
            "Failed to fetch prompt",
            {status: 500}
        )
    }    
}
//@ts-ignore
export const PATCH = async (req: Request, {params}) => {
    try {
        await connectToDB();

        const pid = params.id;

        const res = await Prompt.findOne({_id: pid}).populate('creator')
        if(!res){
            return new Response(
                "Prompt Not Found!",
                {status: 404}
            )
        }

        const data = await req.json();

        const {prompt, tag} = data;

        res.prompt = prompt
        res.tag = tag

        await res.save();

        return new Response(
            "Prompt updated successfully",
            {status: 200}
        )

    } catch (error) {
        console.log(error);
        return new Response(
            "Failed to edit prompt",
            {status: 500}
        )
    }
}
//@ts-ignore
export const DELETE = async (req: NextApiRequest,{params}) => {
    try {
        
        await connectToDB();

        const pid = params.id;

        await Prompt.findByIdAndRemove(pid)

        return new Response(
            "Prompt deleted successfully",
            {status: 200}
        )

    } catch (error) {
        console.log(error);
        return new Response(
            "Failed to delete prompt",
            {status: 500}
        )
    }
}
import { auth } from "@/auth";
import connectDb from "@/lib/db";
import Grocery from "@/models/grocery.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{
        await connectDb()
        const session=await auth()
        if(session?.user?.role!=="admin"){
            return NextResponse.json(
                {message:"you are not admin"},
                {status:400}
            )
        }
        let groceryId: string | null = null
        try {
            const body = await req.json()
            groceryId = body?.groceryId
        } catch {
            const formData = await req.formData()
            groceryId = formData.get('groceryId') as string | null
        }
        if (!groceryId) {
            return NextResponse.json({ message: 'groceryId is required' }, { status: 400 })
        }
        const grocery = await Grocery.findByIdAndDelete(groceryId)
        return NextResponse.json(
            grocery,
            { status: 200 }
        )
        
    } catch(error){
        return NextResponse.json(
                {message:`delete grocery error${error}`},
                {status:500}
            )

    }
    
}

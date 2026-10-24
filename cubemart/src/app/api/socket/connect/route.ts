import connectDb from "@/lib/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    try{
        await connectDb()
        const {userId,socketId}=await req.json();
        
        if(!userId || !socketId){
            return NextResponse.json({success:false,status:400,message:"userId and socketId are required"},{status:400})
        }
        
        const user = await User.findByIdAndUpdate(userId,{
            socketId,
            isOnline:true
        },{new:true})
        
        if(!user){
            return NextResponse.json({success:false,status:404,message:"User Not Found"},{status:404})
        }
        return NextResponse.json({success:true,status:200})
    }catch(error){
        console.error('Socket connect error:', error);
        return NextResponse.json({success:false,status:500,message:`Internal Server Error: ${error instanceof Error ? error.message : String(error)}`},{status:500})
    }
}
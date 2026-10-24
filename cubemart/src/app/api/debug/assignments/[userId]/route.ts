import connectDb from "@/lib/db";
import DeliveryAssignment from "@/models/deliveryAssignment.model";
import "@/models/order.model";
import { NextResponse } from "next/server";

export async function GET(){
  try{
    await connectDb();
    const assignments = await DeliveryAssignment.find({}).sort({createdAt:-1}).limit(50).populate('order').lean();
    return NextResponse.json({count: assignments.length, assignments},{status:200});
  }catch(err){
    console.error('debug assignments error', err);
    return NextResponse.json({message: String(err)},{status:500});
  }
}

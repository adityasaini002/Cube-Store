import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {

    const {pathname}= req.nextUrl;
    const publicRoutes=["/login","/register","/api/auth","/api/user/stripe","/api/socket/connect","/api/socket/update-location","/api/chat/save","/api/chat/messages"];
    if(publicRoutes.some((pathr)=> pathname.startsWith(pathr))){
        return NextResponse.next();
    }
    const session = await auth();
    if(!session?.user){
       const loginUrl=new URL('/login',req.url);
       loginUrl.searchParams.set('callbackUrl',req.url);
       return NextResponse.redirect(loginUrl);
    }
   
    const role=session.user.role
    if(pathname.startsWith("/user") && role!=="user" ){
        return NextResponse.redirect(new URL ("/unauthorized",req.url))
    }
    if(pathname.startsWith("/delivery") && role!=="deliveryBoy" ){
        return NextResponse.redirect(new URL ("/unauthorized",req.url))
    }
    if(pathname.startsWith("/admin") && role!=="admin" ){
        return NextResponse.redirect(new URL ("/unauthorized",req.url))
    }




   
   return NextResponse.next();
    
}

export const config={
    matcher:['/((?!_next/static|_next/image|favicon.ico).*)']
}
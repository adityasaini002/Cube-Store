import connectDb from "@/lib/db";
import Order from "@/models/order.model";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
    try {
        await connectDb()
        const { userId, items, paymentMethod, totalAmount, address } = await req.json()
        if (!items || !userId || !paymentMethod || !totalAmount || !address) {
            return NextResponse.json(
                { message: "please send all credentials" },
                { status: 400 }
            )

        }
        const user = await User.findById(userId)
        if (!user) {
            return NextResponse.json(
                { message: "user not found" },
                { status: 400 }

            )
        }
        const newOrder = await Order.create({
            user: userId,
            items,
            paymentMethod,
            totalAmount,
            address,

        })

        const baseUrl = process.env.APP_BASE_URL || process.env.NEXT_BASE_URL || req.nextUrl.origin;
        const amountInPaise = Math.round(Number(totalAmount) * 100);

        if (!Number.isInteger(amountInPaise) || amountInPaise < 50 * 100) {
            return NextResponse.json(
                { message: "Stripe requires a valid order amount of at least ₹50" },
                { status: 400 }
            );
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${baseUrl}/user/order-success`,
            cancel_url: `${baseUrl}/user/checkout`,
            line_items: [{
                price_data: {
                    currency: 'inr',
                    product_data: {
                        name: 'CubeMart Order Payment',
                    },
                    unit_amount: amountInPaise,
                },
                quantity: 1,
            },

            ],
            metadata: {
                orderId: newOrder._id.toString(),
            },
        })
        return NextResponse.json({ url: session.url }, { status: 200 })


    } catch (error) {
        console.error("Stripe payment error:", error);
        return NextResponse.json(
            { message: "Unable to create the Stripe checkout session" },
            { status: 500 }

        )

    }
}

import React from 'react'
import DeliveryBoyDashboard from './DeliveryBoyDashboard'
import { auth } from '@/auth'
import { connect } from 'http2'
import { connectDb } from '@/lib/db'
import Order from '@/models/order.model'

async function DeliveryBoy() {
  await connectDb()
  const session = await auth()
  const deliveryBoyId = session?.user?.id
  const orders=await Order.find({
    assignedDeliveryBoy:deliveryBoyId,
    deliveryOtpVerification:true
  })
  const today = new Date().toDateString()
  const todaysOrders = orders.filter((o)=>o.deliveryAt && new Date(o.deliveryAt).toDateString()===today).length
  const todaysEarnings = todaysOrders*40
  return (
   <>
   <DeliveryBoyDashboard earnings={todaysEarnings} orders={todaysOrders}/>
   </>
  )
}

export default DeliveryBoy

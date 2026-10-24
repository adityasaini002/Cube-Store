'use client'
import { getSocket } from '@/lib/socket'
import { RootState } from '@/redux/store'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import LiveMap from './LiveMap'
import DeliveryChat from './DeliveryChat'
import {Loader } from 'lucide-react'
import { ResponsiveContainer, Tooltip, Bar, XAxis, BarChart, Legend, YAxis } from 'recharts'

interface ILocation{
    latitude:number,
    longitude:number
}
function DeliveryBoyDashboard({earnings,orders}:{earnings:number,orders:number}) {
    const [assignments, setAssignments] = React.useState<any[]>([])
    const {userData}=useSelector((state:RootState)=>state.user) as {userData: any}
    const [activeOrder,setActiveOrder]=useState<any>(null)
    const [showOtpBox,setShowOtpBox]=useState(false)
    const [otp,setOtp]=useState("")
    const [otpError,setOtpError]=useState("")
    const [sendOtpLoading,setSendOtpLoading]=useState(false)
    const [verifyOtpLoading,setVerifyOtpLoading]=useState(false)
    const [userLocation,setUserlocation]=useState<ILocation>({
        latitude:0,
        longitude:0
    })
    const [deliveryBoyLocation,setDeliveryBoyLocation]=useState<ILocation>({
        latitude:0,
        longitude:0
    })
    const fetchAssignments = async () => {
        try {
            const result = await axios.get("/api/delivery/get-assignments")
            console.log("Fetched assignments:", result.data)
            setAssignments(result.data.assignments || [])
        } catch (error) {
            console.error("Error fetching assignments:", error)
        }
    }

    useEffect(()=>{
        const socket=getSocket()
     if(!userData?._id)return
        if(!navigator.geolocation)return
        const watcher = navigator.geolocation.watchPosition((pos)=>{
            const {latitude,longitude}=pos.coords
            setDeliveryBoyLocation({latitude,longitude})
            socket.emit("update-location",{userId:userData?._id,latitude,longitude})

        },(err)=>{
        console.error("Error getting location",err)

        },{enableHighAccuracy:true,})
        return ()=>{
            navigator.geolocation.clearWatch(watcher)
        }
    },[userData?._id])

    useEffect((): any => {
        const socket = getSocket()
        socket?.on("new-assignment", (DeliveryAssignment) => {
            setAssignments((prev) => [...prev, DeliveryAssignment])

        })
        return () => socket.off("new-assignment")
    }, [])
    const handleAccept = async (id: string) => {
        try {
            const response = await axios.get(`/api/delivery/assignment/${id}/accept-assignment`)
            fetchCurrentOrder()

        } catch (error) {
            console.log(error)
        }
    }

       
        const fetchCurrentOrder = async () => {
            try {
                const result = await axios.get("/api/delivery/current-order")
                if(result.data.active){
                   setActiveOrder(result.data.assignment)
                   setUserlocation({
                    latitude:result.data.assignment.order.address.latitude,
                    longitude:result.data.assignment.order.address.longitude
                   })
                } else {
                   setActiveOrder(null)
                }
               
            } catch (error) {
                console.log(error)
            }
        }

        useEffect(() => {
            const socket = getSocket()
            socket.on("update-deliveryBoy-location", ({ userId, location }) => {
                setDeliveryBoyLocation({
                    latitude: location.coordinates[1],
                    longitude: location.coordinates[0]
                })
            })
            return () => {
                socket.off("update-deliveryBoy-location")}
        }, [userData])
             
        useEffect(() => {
        fetchCurrentOrder()
        fetchAssignments()
       }, [userData])

       const sendOtp=async ()=>{
        setSendOtpLoading(true)
        try {
            const result=await axios.post("/api/delivery/otp/send",{orderId:activeOrder.order._id})
            console.log(result.data)
            // don't clear the active order – we need it for OTP entry
            setShowOtpBox(true)
            setSendOtpLoading(false)
        } catch (error) {
            console.log(error)
            setSendOtpLoading(false)
        }
       }

       const verifyOtp=async ()=>{
        setVerifyOtpLoading(true)
        try {
            const result=await axios.post("/api/delivery/otp/verify",{orderId:activeOrder.order._id,otp})
            console.log(result.data)
            setActiveOrder(null)
            setShowOtpBox(false)
            setVerifyOtpLoading(false)
            await fetchCurrentOrder()
            await fetchAssignments()
        } catch (error) {
            setVerifyOtpLoading(false)
            setOtpError("Invalid OTP")
        }
       }
    if(!activeOrder && assignments.length===0){
        const todayEarning=[
            {
                name:"Today's Earnings",
                earnings,
                deliveries:earnings/40
            }
        ]
        return(
            <div className='flex items-center justify-center min-h-screen bg-linear-to-br from-white to-amber-50 p-6'>
            <div className='max-w-md w-full text-center'>
                <h2 className='text-2xl font-bold text-gray-800'>No Active Deliveries 🚚</h2>
                <p className='text-gray-500 mb-5'>Stay online to receive delivery orders</p>
                <div className='bg-white border rounded-xl shadow-xl p-6'>
                    <h2 className='text-amber-600 font-medium mb-2'>Today's Performance</h2>
                     <ResponsiveContainer width="100%" height={300}>
                                <XAxis dataKey="name" />
                                <BarChart data={todayEarning}>
                                 <YAxis/>
                                 <Tooltip/>
                                 <Legend/>
                                 <Bar dataKey="deliveries" fill="#f59e0b" name="Deliveries" radius={[6, 6, 0, 0]} />
                                 <Bar dataKey="earnings" fill="#10b981" name="Earnings" radius={[6, 6, 0, 0]} />
                                </BarChart>
                              </ResponsiveContainer>
                 <p className='mt-4 text-lg font-bold text-green-700'>{earnings||0} Earned today</p>
                 <button className='mt-4 w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded-lg' onClick={()=>window.location.reload()}>Refresh Earning</button>
                </div>
            </div>
            </div>
        )
    }    
     
   if(activeOrder && userLocation){
    return(
        <div className='p-4 pt-[120px] min-h-screen bg-gray-50 '>
            <div className='max-w-3xl mx-auto'>
               <h1 className='text-2xl font-bold text-amber-600 mb-2'>Active Delivery</h1>
               <p className='text-gray-600 text-sm mb-4'>order#{activeOrder.order._id.slice(-6)}</p>
               <div className='rounded-xl border shadow-lg overflow-hidden mb-6'>
                  <LiveMap userLocation={userLocation} deliveryBoyLocation={deliveryBoyLocation}/>
               </div>
               <DeliveryChat orderId={activeOrder.order._id} deliveryBoyId={userData?._id!}/>
               <div className='mt-6 bg-white rounded-xl border shadow p-6'>
                {!activeOrder.order.deliveryOtpVerification && !showOtpBox && (
                 <button
                 onClick={sendOtp}
                 className='w-full py-4 bg-amber-600 text-white rounded-lg flex items-center justify-center'
                 >{sendOtpLoading ? <Loader size={16} className='animate-spin text-white'/> : "Mark as Delivered"}</button>
                )}
                {
                    showOtpBox && 
                    <div className='mt-4'>
                        <input type="text" placeholder='Enter OTP' maxLength={4} value={otp} onChange={(e)=>setOtp(e.target.value)} className='w-full p-3 border rounded-lg text-center'/>
                        <button className='w-full mt-4 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center' onClick={verifyOtp}>{verifyOtpLoading ? <Loader size={16} className='animate-spin text-white'/> : "Verify OTP"}</button>
                        {otpError && <p className='text-red-600 mt-2 text-center'>{otpError}</p>}
                    </div>
                }
                {activeOrder.order.deliveryOtpVerification && <p className='text-green-600 text-center'>Delivery Completed!</p>}


               </div>
            </div>



        </div>
    )
   }
    return (
        <div className='w-full min-h-screen bg-gray-50 p-4'>
            <div className='max-w-3xl mx-auto'>
                <h2 className='text-2xl font-bold mt-[120px] mb-[30px]'>Delivery Assignment</h2>
                {assignments.map((a,index) => (
                    <div key={index} className='p-5 bg-white rounded-xl shadow mb-4 border'>
                        <p><b>Order Id </b>#{a?.order?._id?.slice(-6) || 'N/A'}</p>
                        <p className='text-gray-600'>{a?.order?.address?.fullAddress || 'N/A'}</p>
                        <div className='flex gap-3 mt-4'>
                            <button className='flex-1 bg-green-600 text-white py-2 rounded-lg' onClick={() => handleAccept(a._id)}>Accept</button>
                            <button className='flex-1 bg-red-600 text-white py-2 rounded-lg'>Reject</button>
                        </div>
                    </div>
                ))}

            </div>

        </div>
    )
}

export default DeliveryBoyDashboard

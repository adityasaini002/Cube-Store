'use client'
import { getSocket } from '@/lib/socket'
import React, { use, useEffect } from 'react'

function GeoUpdater({ userId }: { userId: string }) {
    let socket=getSocket()
    socket.emit("identity",userId)
    useEffect(()=>{
        if(!userId)return
        if(!navigator.geolocation)return
        const watcher = navigator.geolocation.watchPosition((pos)=>{
            const {latitude,longitude}=pos.coords
            socket.emit("update-location",{userId,latitude,longitude})

        },(err)=>{
        console.error("Error getting location",err)

        },{enableHighAccuracy:true,})
        return ()=>{
            navigator.geolocation.clearWatch(watcher)
        }
    },[userId])
  return null
}

export default GeoUpdater


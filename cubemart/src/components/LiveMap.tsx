'use client'

import React, { useEffect } from 'react'
interface ILocation {
    latitude: number,
    longitude: number
}
interface Iprops {
    userLocation: ILocation
    deliveryBoyLocation: ILocation
}
import L, { LatLngExpression } from "leaflet"
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'
function Recenter({position}:{position:[number,number]}) {
    const map=useMap()
    useEffect(()=>{
    if(position[0]!==0 && position[1]!==0){
        map.setView(position,map.getZoom(),{
            animate:true
        })
    }
    },[position,map])
    return null
}
function LiveMap({ userLocation, deliveryBoyLocation }: Iprops) {
    const deliveryBoyIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/9561/9561839.png",
        iconSize: [45, 45]
    })
    const userIcon = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/4821/4821951.png",
        iconSize: [45, 45]
    })
    const linePositions=
        deliveryBoyLocation && userLocation?[
        [userLocation.latitude, userLocation.longitude],
        [deliveryBoyLocation.latitude, deliveryBoyLocation.longitude]
        ]:[]
    
    const center=[userLocation.latitude,userLocation.longitude]
    return (
        <div className='w-full h-[500px] rounded-xl overflow-hidden shadow sticky top-24'>
            <MapContainer center={center as LatLngExpression} zoom={13} scrollWheelZoom={true} className='w-full h-full '>
                <Recenter position={center as any}/>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[userLocation.latitude,userLocation.longitude]} icon={userIcon}>
                     <Popup>
                        <div className="font-bold">User Location</div>
                    </Popup>
                </Marker>
                {deliveryBoyLocation && <Marker position={[deliveryBoyLocation.latitude,deliveryBoyLocation.longitude]} icon={deliveryBoyIcon} >
                    <Popup>
                        <div className="font-bold">Delivery Boy</div>
                    </Popup>
                    </Marker>}
                    <Polyline positions={linePositions as any} color='red'></Polyline>
            </MapContainer>
        </div>
    )
}

export default LiveMap

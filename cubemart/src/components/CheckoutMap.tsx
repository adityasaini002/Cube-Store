'use client'
import React, { useEffect } from 'react'
import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import L, {LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
const markerIcon = new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});
type Props = {
    position: [number, number],
    setPosition: (pos: [number, number]) => void
}

function CheckoutMap({ position, setPosition }: Props) {
      const DraggableMarker: React.FC = () => {
        const map=useMap()
        useEffect(()=>{
            map.setView(position as LatLngExpression,15,{animate:true})
        },[position,map])

        return <Marker
            icon={markerIcon}
            position={position as LatLngExpression}
            draggable={true}
            eventHandlers={{
                dragend: (e: L.LeafletEvent) => {
                    const marker = e.target as L.Marker;
                    const { lat, lng } = marker.getLatLng();
                    setPosition([lat, lng]);
                }

            }} />     
    }
  return (
   <MapContainer center={position as LatLngExpression} zoom={13} scrollWheelZoom={true} className='w-full h-full '>
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                <DraggableMarker />

                            </MapContainer>
  )
}

export default CheckoutMap

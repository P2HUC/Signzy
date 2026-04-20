"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Image from "next/image";

// Use the user's custom placeholder icon
const iconLocation = new L.Icon({
    iconUrl: '/icon/placeholder.png',
    iconRetinaUrl: '/icon/placeholder.png',
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50],
});

// A component that updates the map's center when location changes
function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 18);
    }, [center, map]);
    return null;
}

export default function MapComponent() {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        // Hardcode location to Da Nang City as the map is specifically for Da Nang
        setPosition([16.0544, 108.2022]);
    }, []);

    if (errorMsg) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-slate-100 p-4 text-center text-rose-500 dark:bg-slate-900">
                <p>{errorMsg}</p>
            </div>
        );
    }

    if (!position) {
        return (
            <div className="flex h-full w-full flex-col items-center justify-center bg-slate-100 dark:bg-slate-900">
                <Image src="/mascot.svg" alt="Loading" height={60} width={60} className="animate-spin" />
                <p className="mt-4 text-muted-foreground">Finding your location...</p>
            </div>
        );
    }

    return (
        <MapContainer
            key={`${position[0]}-${position[1]}`}
            center={position}
            zoom={18}
            scrollWheelZoom={true}
            className="h-full w-full z-0"
        >
            <ChangeView center={position} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position} icon={iconLocation}>
                <Popup>
                    <div className="text-center font-bold">
                        You are here!
                    </div>
                </Popup>
            </Marker>

        </MapContainer>
    );
}

"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Image from "next/image";

// Fix missing marker icons in leaflet with Next.js/Webpack
const iconPerson = new L.Icon({
    iconUrl: '/mascot.svg',
    iconRetinaUrl: '/mascot.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
});

// A component that updates the map's center when location changes
function ChangeView({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.setView(center, 15);
    }, [center, map]);
    return null;
}

export default function MapComponent() {
    const [position, setPosition] = useState<[number, number] | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setErrorMsg("Geolocation is not supported by your browser");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPosition([pos.coords.latitude, pos.coords.longitude]);
            },
            (err) => {
                setErrorMsg("Unable to retrieve your location");
                console.error(err);
            }
        );
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
            center={position}
            zoom={15}
            scrollWheelZoom={true}
            className="h-full w-full z-0"
        >
            <ChangeView center={position} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={position} icon={iconPerson}>
                <Popup>
                    <div className="text-center font-bold">
                        You are here!
                    </div>
                </Popup>
            </Marker>

        </MapContainer>
    );
}

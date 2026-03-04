/* eslint-disable import/order */
"use client";

import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type VideoPlayerProps = {
    src: string;
    className?: string;
    autoPlay?: boolean;
};

export const VideoPlayer = ({
    src,
    className,
    autoPlay = true,
}: VideoPlayerProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [playbackRate, setPlaybackRate] = useState(1);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                void videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const changeSpeed = () => {
        if (videoRef.current) {
            const newRate =
                playbackRate === 1 ? 0.75 : playbackRate === 0.75 ? 0.5 : 1;
            videoRef.current.playbackRate = newRate;
            setPlaybackRate(newRate);
        }
    };

    return (
        <div
            className={cn(
                "group relative w-full overflow-hidden rounded-2xl bg-black shadow-lg ring-1 ring-white/10",
                className
            )}
        >
            <video
                ref={videoRef}
                src={src}
                className="h-auto max-h-[50vh] w-full object-contain"
                autoPlay={autoPlay}
                playsInline
                loop
                onClick={togglePlay}
            />

            {/* Overlay Controls that appear on hover */}
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={togglePlay}
                    className="text-white hover:bg-white/20 hover:text-white"
                >
                    {isPlaying ? (
                        <Pause className="h-6 w-6" fill="currentColor" />
                    ) : (
                        <Play className="h-6 w-6" fill="currentColor" />
                    )}
                </Button>

                <Button
                    variant="secondary"
                    size="sm"
                    onClick={changeSpeed}
                    className="border-white/20 bg-black/50 text-white hover:bg-white/20 hover:text-white"
                >
                    {playbackRate}x
                </Button>
            </div>
        </div>
    );
};

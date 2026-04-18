"use client";

import { useState } from "react";
import { FlashCard } from "./flash-card";
import { challengeOptions, challenges } from "@/db/schema";
import { Button } from "./ui/button";

type ChallengeWithOptions = typeof challenges.$inferSelect & {
    challengeOptions: typeof challengeOptions.$inferSelect[];
};

type Props = {
    challenges: ChallengeWithOptions[];
};

export const ReviewDeck = ({ challenges }: Props) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!challenges || challenges.length === 0) {
        return (
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-center text-blue-800">
                You have no items to review yet. Get out there and learn more!
            </div>
        );
    }

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % challenges.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + challenges.length) % challenges.length);
    };

    const currentChallenge = challenges[currentIndex];

    return (
        <div className="flex w-full flex-col items-center gap-y-8 pb-10">
            <div className="text-muted-foreground font-medium">
                Card {currentIndex + 1} of {challenges.length}
            </div>

            <FlashCard challenge={currentChallenge} />

            <div className="flex w-full max-w-sm items-center justify-between gap-x-4">
                <Button
                    variant="secondary"
                    size="lg"
                    onClick={handlePrev}
                    className="w-full"
                >
                    Previous
                </Button>
                <Button
                    variant="secondary"
                    size="lg"
                    onClick={handleNext}
                    className="w-full"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

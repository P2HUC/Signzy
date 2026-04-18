import Image from "next/image";
import { challengeOptions, challenges } from "@/db/schema";
import { cn } from "@/lib/utils";
import { VideoPlayer } from "./video-player";

type ChallengeWithOptions = typeof challenges.$inferSelect & {
    challengeOptions: typeof challengeOptions.$inferSelect[];
};

type Props = {
    challenge: ChallengeWithOptions;
};

export const FlashCard = ({ challenge }: Props) => {
    const correctAnswer = challenge.challengeOptions.find((option) => option.correct);

    return (
        <div className="group h-80 w-full max-w-sm [perspective:1000px]">
            <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front of the card */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border-2 border-b-4 border-slate-200 bg-white p-6 shadow-sm [backface-visibility:hidden] dark:border-slate-800 dark:bg-slate-900">

                    {challenge.type === "VIDEO" && challenge.videoSrc ? (
                        <div className="mb-4 h-32 w-full overflow-hidden rounded-lg">
                            {/* Temporary disabled video player here or just show a thumbnail for simplicity if real video player has issues, using actual component for now */}
                            <video src={challenge.videoSrc} className="h-full w-full object-cover" controls={false} />
                        </div>
                    ) : (
                        <Image
                            src="/mascot.svg"
                            alt="Mascot"
                            height={80}
                            width={80}
                            className="mb-4"
                        />
                    )}

                    <p className="text-center text-lg font-bold text-neutral-700 dark:text-neutral-200">
                        {challenge.question}
                    </p>
                    <p className="mt-4 text-sm text-muted-foreground">Hover or tap to flip</p>
                </div>

                {/* Back of the card */}
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border-2 border-b-4 border-slate-200 bg-green-50 p-6 shadow-sm [backface-visibility:hidden] [transform:rotateY(180deg)] dark:border-slate-800 dark:bg-green-900/20">
                    <Image
                        src="/mascot.svg"
                        alt="Mascot"
                        height={60}
                        width={60}
                        className="mb-4 drop-shadow-md"
                    />
                    <p className="mb-2 text-sm font-semibold text-green-500">Correct Answer</p>
                    <h2 className="text-center text-2xl font-bold text-green-600 dark:text-green-400">
                        {correctAnswer?.text || "Answer not found"}
                    </h2>
                </div>
            </div>
        </div>
    );
};

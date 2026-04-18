import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { FeedWrapper } from "@/components/feed-wrapper";
import { getUserProgress, getUserSubscription } from "@/db/queries";

// Dynamically import the map component with SSR disabled
const Map = dynamic(() => import("@/components/map"), {
    ssr: false,
});

const SignzyMapPage = async () => {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();

    const [userProgress, userSubscription] = await Promise.all([
        userProgressData,
        userSubscriptionData,
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    const isPro = !!userSubscription?.isActive;

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={isPro}
                />
            </StickyWrapper>
            <FeedWrapper>
                <div className="flex w-full flex-col items-center">
                    <h1 className="text-center text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                        Signzy Map
                    </h1>
                    <p className="mb-6 text-center text-muted-foreground">
                        Explore friendly places around your current location.
                    </p>
                    <div className="h-[600px] w-full overflow-hidden rounded-xl border-2 border-slate-200 shadow-sm dark:border-slate-800">
                        <Map />
                    </div>
                </div>
            </FeedWrapper>
        </div>
    );
}

export default SignzyMapPage;

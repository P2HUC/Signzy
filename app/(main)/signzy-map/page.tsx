import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { UserProgress } from "@/components/user-progress";
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
        <div className="flex w-full flex-col px-6 pb-10">
            <div className="mb-6 flex w-full justify-center lg:justify-end">
                <div className="w-full lg:w-[368px]">
                    <UserProgress
                        activeCourse={userProgress.activeCourse}
                        hearts={userProgress.hearts}
                        points={userProgress.points}
                        hasActiveSubscription={isPro}
                    />
                </div>
            </div>
            
            <div className="flex w-full flex-col items-center">
                <h1 className="mb-2 text-center text-2xl font-bold text-neutral-800 dark:text-neutral-200">
                    Signzy Map
                </h1>
                <p className="mb-6 text-center text-muted-foreground">
                    Explore friendly places around your current location.
                </p>
                <div className="h-[600px] w-full overflow-hidden rounded-xl border-2 border-slate-200 shadow-sm dark:border-slate-800">
                    <Map />
                </div>
            </div>
        </div>
    );
}

export default SignzyMapPage;

import { NotebookText } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

type UnitBannerProps = {
  title: string;
  description: string;
};

export const UnitBanner = ({ title, description }: UnitBannerProps) => {
  return (
    <div className="flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 p-5 text-white shadow-md">
      <div className="space-y-2.5">
        <h3 className="text-2xl font-bold drop-shadow-sm">{title}</h3>
        <p className="text-lg font-medium opacity-90">{description}</p>
      </div>

      <Link href="/lesson">
        <Button
          size="lg"
          variant="secondary"
          className="hidden border-2 border-b-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg active:border-b-2 xl:flex"
        >
          <NotebookText className="mr-2" />
          Continue
        </Button>
      </Link>
    </div>
  );
};

import Image from "next/image";

import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="hidden h-20 w-full border-t border-white/10 bg-slate-950 p-2 lg:block">
      <div className="mx-auto flex h-full max-w-screen-lg items-center justify-evenly">
        <Button
          size="lg"
          variant="ghost"
          className="w-full cursor-default text-slate-400 hover:bg-transparent"
        >
          <Image
            src="/asl.svg"
            alt="American Sign Languae"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
          ASL
        </Button>
      </div>
    </div>
  );
};

"use client";
import { useState } from "react";

import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Banner from "@/components/banner";
import { Button } from "@/components/ui/button";
import { links } from "@/config";
import { cn } from "@/lib/utils";

export const Header = () => {
  const { isSignedIn } = useAuth();
  const [hideBanner, setHideBanner] = useState(true);

  return (
    <>
      <Banner hide={hideBanner} setHide={setHideBanner} />

      <header
        className={cn(
          "sticky top-0 z-50 h-20 w-full border-b border-white/10 bg-slate-950/80 px-4 backdrop-blur-md",
          !hideBanner ? "mt-20 sm:mt-16 lg:mt-10" : "mt-0"
        )}
      >
        <div className="mx-auto flex h-full items-center justify-between lg:max-w-screen-lg">
          <Link href="/" className="flex items-center gap-x-2 pb-7 pl-4 pt-8">
            <h1 className="text-3xl font-extrabold tracking-wide text-white">
              Signzy<span className="text-blue-500">.</span>
            </h1>
          </Link>

          <div className="flex gap-x-3">
            <ClerkLoading>
              <Loader className="h-5 w-5 animate-spin text-muted-foreground" />
            </ClerkLoading>
            <ClerkLoaded>
              <SignedIn>
                <UserButton />
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="text-slate-300 hover:bg-white/10 hover:text-white"
                  >
                    Login
                  </Button>
                </SignInButton>
              </SignedOut>

              <Link
                href={links.sourceCode}
                target="_blank"
                rel="noreferrer noopener"
                className={isSignedIn ? "pt-1.5" : "pt-3"}
              >
                <Image
                  src="/github.svg"
                  alt="Source Code"
                  height={20}
                  width={20}
                  className="opacity-70 invert transition hover:opacity-100"
                />
              </Link>
            </ClerkLoaded>
          </div>
        </div>
      </header>
    </>
  );
};

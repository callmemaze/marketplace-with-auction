import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Register = () => {
  return (
    <>
      <nav className="flex items-center justify-center p-4">
        <span className="text-lg font-Bricolage font-bold">
          <Link href="/">Marketplace</Link>
        </span>
      </nav>
      <div className="container h-screen flex items-center justify-center">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-sm text-muted-foreground">
                Enter your email below to create your account
              </p>
            </div>
            <div className={cn("grid gap-6")}>
              <form>
                <div className="grid gap-2">
                  <div className="grid gap-1">
                    <Input id="name" placeholder="Name" type="text" />

                    <Input
                      className="mt-2"
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      auto-capitalize="none"
                      auto-complete="email"
                      auto-correct="off"
                    />

                    <Input
                      className="mt-2"
                      id="password"
                      placeholder="Password"
                      type="password"
                    />
                  </div>
                  <Button type="submit">Sign Up with Email</Button>
                </div>
              </form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    <Link href="/login">Already have an account</Link>
                  </span>
                </div>
              </div>
            </div>
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our
              <a
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </a>
              and
              <a
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
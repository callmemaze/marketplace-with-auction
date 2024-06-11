import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MoveUpRight } from "lucide-react";

const Home = () => {
  return (
    <section className="p-14">
      <div className="flex justify-between">
        <div className="h-screen p-7 max-md:p-0">
          <div className="">
            <div className="flex flex-col">
              <span className="font-Bricolage font-bold text-5xl">
                The One Stop Destination
              </span>
              <span className="font-Bricolage font-bold text-5xl">
                For Every Freelancer
              </span>
            </div>
            <div className="mt-5">
              <span className="text-text-grey text-xl font-Bricolage font-medium">
                Now your can hire and recuit top Freelancers in Nepal to your
                needs.
              </span>
            </div>
            <div className="mt-16 flex justify-between">
              <div>
                <div className="flex flex-col">
                  <span className="font-Bricolage text-2xl">
                    I'm Freelancer
                  </span>
                  <span className="font-Bricolage text-sm text-text-grey mt-5">
                    Get the opportunity that boost
                  </span>
                  <span className="font-Bricolage text-sm text-text-grey mb-5">
                    your design career
                  </span>
                  <Button variant="ghost">
                    <Link href="/login">
                      <span className="font-Bricolage text-left">
                        Get Started
                      </span>
                    </Link>
                    <MoveUpRight />
                  </Button>
                </div>
              </div>
              <div>
                <div className="flex flex-col">
                  <span className="font-Bricolage text-2xl">
                    I want to hire
                  </span>
                  <span className="font-Bricolage text-sm text-text-grey mt-5">
                    Get the opportunity that boost
                  </span>
                  <span className="font-Bricolage text-sm text-text-grey mb-5">
                    your design career
                  </span>
                  <Button variant="ghost">
                    <Link href="/login">
                      <span className="font-Bricolage">Get Started</span>
                    </Link>
                    <MoveUpRight />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="max-md:hidden">
          <Image
            src="/images/6683793.png"
            width={400}
            height={300}
            alt="home page backgriund"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="p-7 max-md:p-0">
          <div className="">
            <div className="flex flex-col">
              <span className="font-Bricolage font-bold text-8xl">
                Search ...
              </span>
            </div>

            <div className="mt-8 flex">
              <div>
                <div className="flex flex-col">
                  <span className="font-Bricolage text-2xl">
                    I'm Freelancer
                  </span>
                  <span className="font-Bricolage text-sm text-text-grey">
                    Get the opportunity that boost your design career{" "}
                  </span>
                  <Button
                    variant="ghost"
                    className="hover:focus:bg-transparent"
                  >
                    <Link href="/login">
                      <span className="font-Bricolage">Get Started</span>
                    </Link>
                    <MoveUpRight />
                  </Button>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        <div className="max-md:hidden">
          <Image src="/images/6683793.png" width={400} height={300} alt="" />
        </div>
      </div>
    </section>
  );
};

export default Home;

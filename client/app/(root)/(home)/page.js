import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MoveUpRight } from "lucide-react";

const Home = () => {
  return (
    <section className="p-14">
      <div className="flex justify-between">
        <div className=" p-7 max-md:p-0">
          <div className="">
            <div className="flex flex-col">
              <span className="font-Bricolage font-bold text-5xl">
                Connecting Buyers and Sellers,
              </span>
              <span className="font-Bricolage font-bold text-5xl">
                One Click at a Time.
              </span>
            </div>
            <div className="mt-5">
              <span className="text-text-grey text-xl font-Bricolage font-medium">
                Now you can buy and sell your item with a click.
              </span>
            </div>
            <div className="mt-16 flex justify-between">
              <div>
                <div className="flex flex-col">
                  <span className="font-Bricolage text-2xl">
                    Go to marketplace
                  </span>
                  <span className="font-Bricolage text-sm text-text-grey mt-5">
                    Buy and sell items
                  </span>

                  <Button variant="ghost">
                    <Link href="/marketplace">
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
                    Visit Auctions
                  </span>
                  <span className="font-Bricolage text-sm text-text-grey mt-5">
                    Get the opportunity
                  </span>

                  <Button variant="ghost">
                    <Link href="/auctions">
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
            src="/images/vector.png"
            width={400}
            height={300}
            alt="home page backgriund"
          />
        </div>
      </div>
    </section>
  );
};

export default Home;

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import moment from "moment";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const AuctionItemCards = ({ item }) => {
  function getTimeRemaining(endtime) {
    let t = endtime - new Date().getTime();
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }
  function initializeClock(endtime) {
    let t = getTimeRemaining(endtime);
    return `${t.minutes} minute:${t.seconds} second`;
  }
  console.log(item);
  return (
    <Card className="shadow-none border-none">
      <CardHeader>
        <img className="w-[350px] h-[160px]" src={item.images[0].url}></img>
        <CardTitle>
          <span className="font-Bricolage">{item.name}</span>
        </CardTitle>
        <CardDescription>
          <span className="font-Bricolage">Price: NRP.{item.price}</span>
        </CardDescription>
        <CardDescription>
          <span className="font-Bricolage">Details: {item.details}</span>
        </CardDescription>

        <CardDescription>
          <span className="font-Bricolage">
            {" "}
            Start Bidding Time: {initializeClock(item.start_bid_date)}
          </span>
        </CardDescription>
        <CardDescription>
          {item.sold ? (
            <span className="font-Bricolage">Sold: Sold</span>
          ) : (
            <span className="font-Bricolage">Sold: Not Sold yet</span>
          )}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex ">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col pl-3">
            <span className="text-sm text-[#0F730C] font-Bricolage">
              {item.user.name}
            </span>
            <span className="text-xs font-Bricolage">
              {moment(item.created_At).fromNow()}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="w-full">
        <div className="w-full">
          {!item.sold ? (
            <Button className="w-full">
              <Link href={`/auctions/[id]`} as={`/auctions/${item._id}`}>
                Bid your price
              </Link>
            </Button>
          ) : (
            <div className="text-red-500">Sold</div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuctionItemCards;

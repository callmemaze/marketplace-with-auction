"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import moment from "moment/moment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useGetAuctionItemQuery } from "@/store/slices/auctionItemSlices";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/router";

const page = ({ params }) => {
  const [items, setItems] = useState();
  const [reBidStart, setReBidStart] = useState(false);
  const [mode, setMode] = useState("");
  const [activeBorder, setActiveBorder] = useState(null);
  const [socket, setSocket] = useState();
  const [timeLeft, setTimeLeft] = useState(0);

  const [currentBid, setCurrentBid] = useState(0);
  const [bidInput, setBidInput] = useState("");
  const [status, setStatus] = useState("");
  const [item, setItem] = useState(null);
  const [winner, setWinner] = useState();
  const [sold, setSold] = useState();
  const [bidderInfo, setBidderInfo] = useState({});
  const [highestBid, setHighestBid] = useState();
  const userProfile = JSON.parse(localStorage.getItem("profile"));
  const router = useRouter();
  useEffect(() => {
    if (!userProfile) {
      router.push("auth/login");
    }
  }, [userProfile]);
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8082");
    setSocket(socket);
    socket.onopen = () => {
      console.log("connected to the server");
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      switch (data.type) {
        case "itemAdded":
          setItem(data.item);
          setStatus("Item added. You can bid now!");
          break;
        case "newBid":
          console.log(data);
          setCurrentBid(data.bidAmount);
          setBidderInfo((prev) => ({
            ...prev,
            [data.bidder]: data.bidAmount,
          }));
          setStatus(`${data.bidder} placed a bid: $${data.bidAmount}`);
          break;
        case "auctionEnded":
          setStatus(
            `Auction ended. Winner: ${data.winner}. Price: $${data.price}`
          );
          setSold(data.sold);
          setWinner(data.winner);
          setHighestBid(data.price);
          setItem(null);
          setCurrentBid(0);
          break;
        default:
          break;
      }
    };
    return () => {};
  }, []);

  const placeBid = () => {
    if (bidInput && parseInt(bidInput) > currentBid) {
      const bidAmount = parseInt(bidInput);
      const currentUser = JSON.parse(localStorage.getItem("profile"));
      const bidder = currentUser.user.result.name; // Replace with actual user identification
      const bidder_id = currentUser.user.result._id;
      socket.send(
        JSON.stringify({ type: "placeBid", bidder, bidAmount, bidder_id })
      );
      setBidInput("");
    } else {
      toast({
        title: "Your bid must be higher than current price",
        variant: "destructive",
      });
    }
  };
  const startAuction = (item) => {
    socket.send(JSON.stringify({ type: "addItem", item }));
  };
  console.log(status);
  const { data, isSuccess, isLoading } = useGetAuctionItemQuery(params.id);
  useEffect(() => {
    if (data && isSuccess) {
      const { result } = data;
      setItems(result);
      setTimeLeft(result.start_bid_date);
    }
  }, [data, isSuccess]);

  const [progress, setProgress] = React.useState(25);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Exit early when we reach 0
    if (!timeLeft) return;

    // Save intervalId to clear the interval when the component unmounts
    const intervalId = setInterval(() => {
      // Set time left
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // Clear interval on unmount
    return () => clearInterval(intervalId);
  }, [timeLeft]);
  const formattedTime = moment.utc(timeLeft * 1000).format("HH:mm:ss");

  return items && !isLoading ? (
    <div className="p-24 flex justify-center items-center">
      <div>
        <div>
          <Image
            src={items.images[0].url}
            width={250}
            height={300}
            alt="home page backgriund"
          />
        </div>
        <div className="flex justify-end mt-3">
          <span className="font-Bricolage font-semibold">
            Price: Nrp.{items.price}{" "}
          </span>
        </div>
        <div className="mt-8 flex items-center">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col pl-3">
            <span className="text-sm text-[#0F730C] font-Bricolage">
              {items.user.name}
            </span>
            <span className="text-xs font-Bricolage">
              {items.user.phone || 9727347233}
            </span>
          </div>
          <span className="text-xs font-Bricolage">
            {moment(items.created_At).fromNow()}
          </span>
        </div>
        <div className="mt-5">
          <Separator className="text-text-grey w-[300px] h-[2px]" />
        </div>
      </div>
      <div className="ml-3">
        <Separator
          orientation="vertical"
          className="text-text-grey w-[2px] h-[470px]"
        />
      </div>
      <div className="p-2 pl-4">
        <div>
          <span className="font-Bricolage font-bold text-3xl">
            {" "}
            {items.name}{" "}
          </span>
        </div>
        <div className="mt-6">
          <span className="font-Bricolage text-xl"> Description </span>
        </div>
        <div>
          <Separator className="text-text-grey w-[600px] h-[2px]" />
        </div>
        <div className="p-3">
          <span>{items.details}</span>
        </div>
        <div className="mt-5">
          <span className="font-Bricolage text-xl">Bidding</span>
        </div>
        <div>
          {status ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">User</TableHead>
                  <TableHead>Start Bid</TableHead>
                  <TableHead>Bid</TableHead>
                  <TableHead className="text-right">Highest Bidder</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.keys(bidderInfo).map((x) => {
                  return (
                    <TableRow>
                      <TableCell className="font-medium">{x}</TableCell>
                      <TableCell>{item?.startingPrice}</TableCell>
                      <TableCell>{bidderInfo[x]}</TableCell>
                      <TableCell className="text-right">{currentBid}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <span className="font-Bricolage"> No bids placed yet. </span>
          )}
        </div>
        {items.sold === true ? (
          <div>
            {" "}
            <span className="font-Bricolage">
              {" "}
              Item already sold to {items.winner}{" "}
            </span>
          </div>
        ) : (
          <div className="mt-3">
            {item ? (
              <div>
                {items.user._id !== userProfile.user.result._id ? (
                  <>
                    <Input
                      className="mt-2"
                      type="number"
                      placeholder="Enter bid amount"
                      value={bidInput}
                      onChange={(e) => setBidInput(e.target.value)}
                    />
                    <Button className="mt-4" onClick={placeBid}>
                      Place Bid
                    </Button>
                  </>
                ) : null}
              </div>
            ) : items.user._id === userProfile.user.result._id &&
              sold !== true ? (
              <Button
                onClick={() =>
                  startAuction({
                    id: items._id,
                    name: items.name,
                    startingPrice: items.price,
                  })
                }
              >
                Start Auction
              </Button>
            ) : (
              <div>
                {sold !== true ? (
                  <span className="font-Bricolage">
                    {" "}
                    Auction Not Started Yet{" "}
                  </span>
                ) : null}
              </div>
            )}
          </div>
        )}
        {winner ? (
          <div className="mt-4 flex flex-col">
            <span className="font-Bricolage text-destructive">
              Auction Ended{" "}
            </span>
            <span className="font-Bricolage">
              Item sold to {winner} with highest bids {highestBid}{" "}
            </span>
          </div>
        ) : null}
      </div>
      <div className="ml-3">
        <Separator
          orientation="vertical"
          className="text-text-grey w-[2px] h-[470px]"
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <Progress value={progress} className="w-[60%]" />
      <span className="mt-10"> Please wait ...... </span>
    </div>
  );
};

export default page;

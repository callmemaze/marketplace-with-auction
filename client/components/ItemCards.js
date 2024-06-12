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

const ItemCards = ({ item }) => {
  console.log(item);
  return (
    <Card className="shadow-none border-none">
      <CardHeader>
        <img className="w-[350px] h-[160px]" src={item.images[0].url}></img>
        <CardTitle>
          <span className="font-Bricolage">{item.title}</span>
        </CardTitle>
        <CardDescription>
          <span className="font-Bricolage">Price: NRP.{item.price}</span>
        </CardDescription>
        <CardDescription>
          <span className="font-Bricolage">Condition: {item.condition}</span>
        </CardDescription>
        <CardDescription>
          <span className="font-Bricolage">
            Description: {item.description}
          </span>
        </CardDescription>
        <CardDescription>
          <span className="font-Bricolage"> Location: {item.location}</span>
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
              {item.seller.name}
            </span>
            <span className="text-xs font-Bricolage">
              {moment(item.created_At).fromNow()}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="w-full">
        <div className="w-full">
          <Button className="w-full">
            <Link href={`/marketplaces/[id]`} as={`/marketplaces/${item._id}`}>
              Read More
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ItemCards;

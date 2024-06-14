import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import moment from "moment";

const Message = ({ message, own }) => {
  return (
    <div className={own ? "flex items-end justify-end mt-3" : "mt-3"}>
      <div className="flex">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="p-[10px] border-r-[20px] bg-blue-300 text-white min-[300px]:">
          {message.text}
        </p>
      </div>
      <div className="text-sm mt-[10px]">{moment(message.time).fromNow()}</div>
    </div>
  );
};

export default Message;

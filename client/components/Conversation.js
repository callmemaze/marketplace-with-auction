import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useGetUserQuery } from "@/store/slices/userSlices";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const friendId = conversation.members.find(
    (m) => m !== currentUser.user.result._id
  );
  const { data, isSuccess, isLoading } = useGetUserQuery(friendId);
  useEffect(() => {
    if (data && isSuccess) {
      setUser(data);
    }
  }, [data, isSuccess]);

  return (
    <Button className="flex w-full h-10 justify-start mt-3" variant="ghost">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <span className="font-Bricolage ml-3">{user?.name}</span>
    </Button>
  );
}

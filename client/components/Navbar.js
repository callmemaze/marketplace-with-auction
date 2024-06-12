"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AlignLeft } from "lucide-react";
import { motion, useCycle } from "framer-motion";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import MobileNav from "./MobileNav";
import { SquarePlus, Send } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const ListItem = React.forwardRef(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 0px 0px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Navbar = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const router = useRouter();
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  function getInitials(name) {
    const initials = name
      .split(" ") // Split the name into an array of words
      .map((word) => word.charAt(0)) // Get the first letter of each word
      .join("");
    return initials;
  }
  const signout = () => {
    localStorage.clear();
    router.push("/auth/login");
    setUser(null);
  };
  return (
    <nav className="w-full h-16 p-3 ">
      <div className="w-full h-full flex justify-between items-center">
        <div className="flex items-center">
          <div className=" md:hidden">
            <motion.div
              initial={false}
              animate={isOpen ? "open" : "closed"}
              ref={containerRef}
            >
              <motion.div
                className="absolute top-0 left-0 bottom-0 w-full h-screen bg-red-400"
                variants={sidebar}
              />
              <MobileNav />
              <AlignLeft
                className="absolute border-none cursor-pointer top-[18px] left-[15px] rounded bg-transparent"
                onClick={() => toggleOpen()}
              />
            </motion.div>
          </div>
          <div className="p-1 md:mr-2 max-md:ml-[33px]">
            <span className="text-lg font-Bricolage font-bold">
              <Link href="/">Marketplace</Link>
            </span>
          </div>
          <div className="ml-2 max-md:hidden">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/marketplaces" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <span className="font-Bricolage">Marketplace</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/auctions" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      <span className="font-Bricolage">Auctions</span>
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        <div className="flex items-center">
          <div className="flex">
            <Button>
              <SquarePlus />
              <Link href="/postItem">
                <span>Post an item</span>
              </Link>
            </Button>
            <div className="ml-3">
              <Separator
                orientation="vertical"
                className="bg-black w-[3px] h-[40px] "
              />
            </div>
          </div>
          {user ? (
            <div className="flex items-center ml-1">
              <div className="ml-3 mr-4 cursor-pointer">
                <Link href="/message">
                  <Send />
                </Link>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer">
                    <Avatar>
                      <AvatarImage
                        src={user.user.result.profile}
                        alt="@profile"
                      />
                      <AvatarFallback>
                        {getInitials(user.user.result.name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />

                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <Button onClick={signout} variant="ghost">
                      <span>Log out</span>
                    </Button>

                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <>
              <Button variant="ghost">
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button variant="outline">
                <Link href="/auth/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import * as React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { ChevronRight } from "lucide-react";
const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const MenuItem = ({ i }) => {
  return (
    <motion.li
      variants={variants}
      className="mb-[20px] flex items-center cursor-pointer"
    >
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Hire a freelancer</AccordionTrigger>
          <AccordionContent>
            <div className="p-[15px]">
              <div className="flex justify-between">
                <span>Post a job</span>
                <ChevronRight size={20} />
              </div>
            </div>
            <div className="p-[15px]">
              <div className="flex justify-between">
                <span>Post a job</span>
                <ChevronRight size={20} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Find Work</AccordionTrigger>
          <AccordionContent>
            <div className="p-[15px]">
              <div className="flex justify-between">
                <span>Post a job</span>
                <ChevronRight size={20} />
              </div>
            </div>
            <div className="p-[15px]">
              <div className="flex justify-between">
                <span>Post a job</span>
                <ChevronRight size={20} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Why Locallance?</AccordionTrigger>
          <AccordionContent>
            <div className="p-[15px]">
              <div className="flex justify-between">
                <span>Post a job</span>
                <ChevronRight size={20} />
              </div>
            </div>
            <div className="p-[15px]">
              <div className="flex justify-between">
                <span>Post a job</span>
                <ChevronRight size={20} />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </motion.li>
  );
};

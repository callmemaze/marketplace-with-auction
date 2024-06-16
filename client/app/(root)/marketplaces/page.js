"use client";
import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { Progress } from "@/components/ui/progress";
import { useGetItemsQuery } from "@/store/slices/itemSlices";
import ItemCards from "@/components/ItemCards";
import { useRouter } from "next/router";

const MarketPlaces = () => {
  const [items, setItems] = useState();
  const { data, isSuccess, isLoading } = useGetItemsQuery();

  useEffect(() => {
    if (data && isSuccess) {
      const { result } = data;
      setItems(result);
    }
  }, [data, isSuccess, isLoading]);
  console.log(items);
  const [progress, setProgress] = React.useState(25);
  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  return items && !isLoading ? (
    <div className="grid grid-cols-3 gap-3 p-10">
      {items.map((item) => (
        <div key={item._id} className="grid w-[400px]">
          <ItemCards item={item} key={item._id} />
        </div>
      ))}
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center h-[80vh]">
      <Progress value={progress} className="w-[60%]" />
      <span className="mt-10"> Please wait ...... </span>
    </div>
  );
};

export default MarketPlaces;

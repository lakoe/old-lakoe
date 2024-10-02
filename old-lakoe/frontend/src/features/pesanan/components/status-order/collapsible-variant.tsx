"use client";

import * as React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/collapsible";
import { Button } from "@/components/ui/button";
import { BsArrow90DegDown, BsDot } from "react-icons/bs";
import { Semua } from "./card-pesanan";

export function CollapsibleVariant(props: any) {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="w-full space-y-2 my-8"
    >
      <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-md font-semibold flex justify-center items-center">
          <BsDot className="text-lg" /> Invoice {props.invoice?.id} has{" "}
          {props.value?.length} Items
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm">
            <BsArrow90DegDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className=" flex flex-col items-start">
        {props.value[0] && (
          <div className="w-full">
            <Semua invoice={props.invoice} items={props.value[0]} />
          </div>
        )}
      </div>
      <CollapsibleContent className="space-y-2 flex flex-col items-end">
        {props.value.map((val: any, index: number) => {
          if (index !== 0)
            return (
              <div className="bg-slate-100 w-10/12">
                <Semua invoice={props.invoice} items={val} />
              </div>
            );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
}

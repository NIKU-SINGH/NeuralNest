import React from "react";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import Spotlight from "@/components/ui/spotlight"

export default function Landing() {
  return (
    <div className="flex-col h-[100vh] w-full  flex md:items-center md:justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="red"
      />
      <div className=" p-4 max-w-7xl  mx-auto relative z-10  w-full pt-20 md:pt-0">
        <h1 className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
          PersonalGPT <br /> is the new trend.
        </h1>
        <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-center mx-auto">
          ChatGPT: Your essential app for deep insights into conversations
          context, sentiment, and responses. Ideal for chat enthusiasts and
          developers to make informed decisions and assess conversations
          effectively. Gain a comprehensive understanding of conversation
          performance and user feedback.
        </p>
      </div>
      <Button variant="secondary" className="w-36">
        <Link to="chat">Try Now</Link>
      </Button>
    </div>
  );
}

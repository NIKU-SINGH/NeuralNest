import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main
      className="flex items-center justify-center flex-col h-screen space-y-4 bg-white"
    >
      <h1 className="text-6xl font-bold">Neural Nest</h1>
      <p className="w-2/4 text-center">
        ChatGPT: Your essential app for deep insights into conversations
        context, sentiment, and responses. Ideal for chat enthusiasts and
        developers to make informed decisions and assess conversations
        effectively. Gain a comprehensive understanding of conversation
        performance and user feedback.
      </p>
      <Button>
        <Link to="chat">Try Now</Link>
      </Button>
    </main>
  );
}

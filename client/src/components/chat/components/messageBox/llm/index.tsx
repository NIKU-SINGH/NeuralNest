import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import llmLogo from "/llmLogo.png";

interface IndexProps {
    message?: string;
}

const Index: React.FC<IndexProps> = ({ message }) => {
    return (
        <div>
            <div className="mt-2 flex space-x-2 ">
                {/* User Avatar */}
                <Avatar className="mx-2">
                    <AvatarImage src={llmLogo} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {/* Replied meessage */}
                <div className="flex items-center rounded-lg p-2 px-4 bg-gray-800 border-2 border-gray-700  max-w-md mx-auto text-white break-words overflow-hidden w-full">
                    {message}
                </div>
            </div>
        </div>
    )
}
export default Index
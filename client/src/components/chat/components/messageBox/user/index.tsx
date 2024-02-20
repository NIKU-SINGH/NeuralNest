import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
interface IndexProps {
    message?: string;
}
const Index: React.FC<IndexProps> = ({ message }) => {
    return (
        <div>
            <div className="mt-2 flex space-x-2">
                {/* User Avatar */}
                <Avatar className="ml-4">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex items-center bg-blue-500 rounded-lg p-2 px-4 max-w-md mx-auto text-white whitespace-normal break-words overflow-hidden w-full">
                    {message}
                </div>
            </div>
        </div>
    )
}
export default Index
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button"

const Index = () => {
    return (
        <div>
            <Button variant="ghost" className="border-2 border-gray-800 hover:bg-blue-500 rounded-xl py-8 w-full justify-start flex items-center gap-2">
                <Avatar className="h-10 w-10 relative ring-2 ring-blue-500 rounded-full">
                    <AvatarImage src="https://github.com/shadcn.png" className="rounded-full p-1" />
                    <AvatarFallback>CN</AvatarFallback>
                    <span className="absolute top-0 right-0 block h-3 w-3 transform translate-x-1/2 -translate-y-1/2 bg-green-500 rounded-full ring-2 ring-white"></span>
                </Avatar>

                <div className="flex flex-col text-gray-300 leading-3">
                    <div className="text-lg font-semibold tracking-tight flex items-center">
                        User name
                    </div>
                    <p>Description of message goes here</p>
                </div>
            </Button>
        </div>
    )
}
export default Index
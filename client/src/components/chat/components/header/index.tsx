import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, Video } from "lucide-react";

function Index() {
    return (
        <div>
            <div className="w-full border-2 border-gray-800 bg-blue-500 text-gray-200 rounded-xl h-10 md:h-16 p-4 flex items-center mb-4 justify-between">
                {/* Profile photo and status */}
                <div className="flex items-center gap-x-2">
                    <Avatar className="h-8 w-8" >
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="-space-y-1">
                        <div className="text-lg font-semibold tracking-tight">User name</div>
                        <div className="text-xs font-light tracking-tight">Online</div>
                    </div>
                </div>

                {/* Call and viceo caht */}
                <div className="px-2 text-lg font-semibold tracking-tight flex items-center">
                    <div className="mx-4 flex items-center gap-1"><Phone /> Call</div>
                    <div className="m-4 flex items-center gap-1"><Video /> Video call</div>
                </div>
            </div>
        </div>
    )
}

export default Index
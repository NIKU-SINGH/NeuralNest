import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Settings, FileUp, MessageCircleMore, MessageCirclePlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import llmLogo from "/llmLogo.png";
import Modal from "@/components/modal";
// import { Playlist } from "../data/playlists"

// interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
//   playlists: Playlist[]
// }

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className="bg-blue-300 rounded-lg h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex items-center mb-2 ">
            <Avatar className="h-8 w-8" >
              <AvatarImage src={llmLogo} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className=" px-4 text-lg font-semibold tracking-tight flex items-center justify-center">
              New Chat
            </div>
          </div>

          <div className="space-y-1">
            <Button variant="secondary" className="w-full justify-start">
              <MessageCirclePlus className="mr-2 h-4 w-4" />
              New Chat
            </Button>
            <Button variant="secondary" className="w-full justify-start">
              <MessageCircleMore className="mr-2 h-4 w-4" />
              Browse
            </Button>
          </div>
        </div>

        <div className="py-2">
          <h2 className="relative px-7 text-lg font-semibold tracking-tight">
            Previous Chats
          </h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1 p-2">
              Yesterday
            </div>
            <div className="space-y-1 py-2 px-3">
              <Button variant="secondary" className="w-full justify-start">
                <MessageCircleMore className="mr-2 h-4 w-4" />
                Browse
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <MessageCircleMore className="mr-2 h-4 w-4" />
                Browse
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <MessageCircleMore className="mr-2 h-4 w-4" />
                Browse
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <MessageCircleMore className="mr-2 h-4 w-4" />
                Browse
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <MessageCircleMore className="mr-2 h-4 w-4" />
                Browse
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <MessageCircleMore className="mr-2 h-4 w-4" />
                Browse
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <MessageCircleMore className="mr-2 h-4 w-4" />
                Browse
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <MessageCircleMore className="mr-2 h-4 w-4" />
                Browse
              </Button>
            </div>
          </ScrollArea>
        </div>

        <div className="relative bottom-0 flex gap-1 flex-col py-2 px-3">

          {/* Modal */}
          <Modal />
          <Button variant="secondary" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>


          <Button variant="secondary" className="w-full justify-start">
            <div className="py-1 px-3 flex gap-2">
              {/* Profile Section */}
              {/* User Avatar */}
              <Avatar className="w-8 h-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex items-center">
                Niku Singh
              </div>
            </div>
          </Button>
        </div>




      </div>
    </div>
  )
}
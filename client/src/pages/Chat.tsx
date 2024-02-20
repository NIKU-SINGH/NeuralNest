import ChatBox from "@/components/chat";
import { Sidebar } from "@/components/sidebar";

function Chat() {
    return (
        <div className='flex w-full'>
            {/* <NavbarDemo /> */}
            <div className={`flex px-4 w-full mt-2`}>
                <Sidebar />
                <div className='hidden md:inline-block w-full'>
                    <ChatBox />
                </div>
            </div>
        </div>
    )
}
export default Chat

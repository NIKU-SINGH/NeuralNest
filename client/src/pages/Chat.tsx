import React from 'react';
import { Sidebar } from '@/components/sidebar';
import ChatBox from '@/components/chatBox';

function Chat() {
    return (
        <div className='flex items-center justify-center w-screen'>

            {/* Sidebar */}
            <div className='w-64 bg-gray-200 p-3 shadow-lg'>
                {/* Sidebar content goes here */}
                <Sidebar />
            </div>

            {/* ChatBox */}
            <div className='flex-1 bg-gray-100'>
                <ChatBox />
            </div>

        </div>
    );
}

export default Chat;

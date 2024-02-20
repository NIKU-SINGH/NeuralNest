import { useState, ChangeEvent, MouseEvent } from "react";
import Navbar from "../navbar/nav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import llmLogo from "/llmLogo.png";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "./components/header";
import UserMessageCard from "./components/messageBox/user";
import FriendMessageCard from "./components/messageBox/llm";
interface responseSchema {
    question?: string;
    answer?: string;
    error?: string;
}

function ChatBox() {

    const [question, setQuestion] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const [responses, setResponses] = useState<responseSchema[]>([]);

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log("The question is", question, loading);
        setResponses((prevState: responseSchema[]) => {
            return [...prevState, { question }];
        });
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:8000/api/v1/query", {
                query: question,
            });
            const answer: string = res.data.response.text;
            setResponses((prevState: responseSchema[]) => {
                return prevState.map((entry) =>
                    entry.question === question ? { ...entry, answer } : entry
                );
            });
        } catch (e: unknown) {
            console.log(e);
            setResponses((prevState: responseSchema[]) => {
                return prevState.map((entry) =>
                    entry.question === question
                        ? { ...entry, error: "there was an error" }
                        : entry
                );
            });
        }
        setQuestion("");
        setLoading(false);
    };
    console.log(responses);



    // useEffect(() => {
    // },[currentResponse])
    return (
        <div className="w-full">
            {/* Chat */}
            <div className="w-full">
                <div className="rounded-b-xl h-screen flex flex-col">
                    {/* Chat Header */}
                    <Header />
                    <ScrollArea className="h-[500px] px-8">
                        {responses?.map((data, id) => (
                            <div key={id} className="mt-4">
                                <UserMessageCard message={data.question} />

                                {/* //Answer Box */}
                                <FriendMessageCard message={data.question} />

                            </div>
                        ))}
                    </ScrollArea>

                    {/* Input */}
                    <div className="px-2 lg:px-10 py-2 flex items-center justify-center">
                        <div className="w-full">
                            {/* Input */}
                            <div className=" flex items-center justify-center py-2 ">
                                <div className="w-full">
                                    {/* <Input /> */}
                                    <div className="flex justify-center items-center space-x-2 ">
                                        <Input
                                            className="w-4/5 p-6 border-2 border-gray-700 bg-gray-800 rounded-xl text-gray-200"
                                            type="text"
                                            value={question}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                setQuestion(e.target.value)
                                            }
                                            placeholder="Type your message here..."
                                        />
                                        <Button
                                            className="w-12 h-12 hover:bg-blue-500 rounded-full bg-gray-800 border-2 border-gray-700"
                                            type="submit"
                                            onClick={handleSubmit}
                                        >
                                            <Send />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatBox;
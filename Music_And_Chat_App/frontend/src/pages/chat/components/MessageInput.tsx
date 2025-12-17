import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/store/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { Send } from "lucide-react";
import { useState } from "react";

const MessageInput = () => {
    const [newMessage, setNewMessage] = useState("");
    const { user } = useUser();
    const { selectedUser, sendMessge } = useChatStore();

    const handleSend = () => {
        if (!selectedUser || !user || !newMessage) return;
        sendMessge(selectedUser.clerkId, user.id, newMessage.trim());
        setNewMessage("");
    };

    return (
        <div className='p-4 mt-auto border-t border-zinc-800'>
            <div className='flex gap-2'>
                <Input
                    placeholder='Type a message'
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className='bg-zinc-800 border-none'
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />

                <Button size={"icon"} onClick={handleSend} disabled={!newMessage.trim()}>
                    <Send className='size-4' />
                </Button>
            </div>
        </div>
    );
};
export default MessageInput;
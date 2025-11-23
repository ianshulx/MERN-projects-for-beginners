import React, { useEffect } from "react";
import { useMessageStore } from "../store/MessageStore";
import ChatHeader from "./chatHeader";
import MessageInput from "./messageInput";
import MessageSkeleton from "./Skeletons/messageSkeleton";
import useAuthStore from "../store/authStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    isMessageLoading,
    getMessage,
    selectedUser,
    messages,
    subscribeToMessage,
    unsubscribeToMessage,
  } = useMessageStore();
  const { user: authUser } = useAuthStore();

  //for auto scroll
  const messageEndRef = React.useRef(null);
  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  //call get message when selected user changed
  useEffect(() => {
    if (selectedUser) {
      getMessage(selectedUser._id);
      subscribeToMessage();
      return () => unsubscribeToMessage();
    }
  }, [selectedUser, getMessage, subscribeToMessage, unsubscribeToMessage]);
  if (isMessageLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      {/* Messages will go here */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic
                      : selectedUser.profilePic
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Message input */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;

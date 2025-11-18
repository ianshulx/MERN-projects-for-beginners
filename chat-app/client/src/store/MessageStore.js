import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axiosInstance";
import useAuthStore from "./authStore";

export const useMessageStore = create((set, get) => ({
  users: [],
  messages: [],
  isUserLoading: false,
  isMessageLoading: false,
  selectedUser: "",

  getUsers: async () => {
    try {
      set({ isUserLoading: true });
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data.users });
    } catch (error) {
      console.log("somthing error in sidebar store", error);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessage: async (userId) => {
    try {
      set({ isMessageLoading: true });
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log("error while geting message", error);
      toast.error("somthing error");
    } finally {
      set({ isMessageLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    try {
      const { messages, selectedUser } = get();
      // messageData = {text,image}
      //post request to send message
      const res = await axiosInstance.post(
        `/message/${selectedUser._id}`,
        messageData
      );
      console.log(res.data);
      //update the message state
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.log("error while sending message", error);
      toast.error("somthing error");
    }
  },
  setSelectedUser: (user) => {
    set({ selectedUser: user });
  },
  subscribeToMessage: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;
    const socket = useAuthStore.getState().socket;
    socket.on("newMessage", (data) => {
      if (data.senderId !== selectedUser._id) return;
      const { messages } = get();
      set({ messages: [...messages, data] });
    });
  },
  unsubscribeToMessage: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },
}));

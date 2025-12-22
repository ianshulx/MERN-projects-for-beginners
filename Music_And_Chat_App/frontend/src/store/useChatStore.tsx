import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import type { Message, User } from "@/types";
import { io } from 'socket.io-client';

interface chatStore {
    users: User[];
    isLoading: boolean,
    error: string | null,
    socket: any,
    isConnected: boolean,
    onlineUsers: Set<string>,
    userActivities: Map<string, string>,
    messages: Message[],
    selectedUser: User | null,

    fetchUsers: () => Promise<void>,
    initSocket: (userId: string) => void,
    disconnectSocket: () => void,
    sendMessge: (receiverId: string, senderId: string, content: string) => void,
    fetchMessages: (userId: string) => Promise<void>,
    setSelectedUser: (user: User | null) => void;
}

const baseURL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";
// const baseURL = "https://music-bd.vercel.app";
const socket = io(baseURL, {
    autoConnect: false,
    withCredentials: true,
});

export const useChatStore = create<chatStore>((set, get) => ({
    users: [],
    isLoading: false,
    error: null,
    socket: null,
    isConnected: false,
    onlineUsers: new Set(),
    userActivities: new Map(),
    messages: [],
    selectedUser: null,

    setSelectedUser: (user) => set({ selectedUser: user }),


    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            await axiosInstance.get('/users').then((res) => {
                const response = res.data.user;
                set({ users: response })
                // console.log(response);

            })
        } catch (error) {
            let message = 'Error fetching users';
            try {
                const e = JSON.parse(JSON.stringify(error));
                if (e?.response?.data?.message) message = e.response.data.message;
                else if (e?.message) message = e.message;
            } catch {
                // keep generic
            }
            set({ error: message })
        } finally {
            set({ isLoading: false })
        }
    },
    initSocket: (userId) => {
        if (!get().isConnected) {
            socket.auth = { userId };

            socket.connect();
            socket.emit("user_connected", userId);

            // store socket instance in state so other actions can use it
            set({ socket });

            socket.on("user_online", (users: string[]) => {
                set({ onlineUsers: new Set(users) })
            })

            socket.on("activities", (activities: [string, string][]) => {
                set({ userActivities: new Map(activities) });
            })

            socket.on("user_connected", (userId: string) => {
                set((state) => ({
                    onlineUsers: new Set([...state.onlineUsers, userId]),
                }));
            });

            socket.on("user_disconnected", (userId: string) => {
                set((state) => {
                    const newOnlineUsers = new Set(state.onlineUsers);
                    newOnlineUsers.delete(userId);
                    return { onlineUsers: newOnlineUsers };
                });
            });

            socket.on("receive_message", (message: Message) => {
                set((state) => ({
                    messages: [...state.messages, message],
                }));
            });

            socket.on("message_sent", (message: Message) => {
                set((state) => ({
                    messages: [...state.messages, message],
                }));
            });

            socket.on("activity_updated", ({ userId, activity }) => {
                // console.log('Activity updated:', { userId, activity });
                set((state) => {
                    const newActivities = new Map(state.userActivities);
                    newActivities.set(userId, activity);
                    // console.log('New activities map:', Array.from(newActivities.entries()));
                    return { userActivities: newActivities };
                });
            });

            set({ isConnected: true });
        }
    },
    disconnectSocket: () => {
        if (get().isConnected) {
            socket.disconnect();
            set({ isConnected: false, socket: null })
        }
    },
    sendMessge: (receiverId, senderId, content) => {
        // prefer using the stored socket instance
        const sock = get().socket || socket;
        if (!sock) return;

        sock.emit('send_message', { receiverId, senderId, content });
    },

    fetchMessages: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get(`/users/message/${userId}`);
            // backend returns an array directly (res.json(messages)),
            // but some endpoints may return { messages: [...] }.
            const messagesPayload = Array.isArray(response.data)
                ? response.data
                : response.data?.messages ?? [];
            set({ messages: messagesPayload });
            console.log(response);
            
        } catch (error) {
            let message = 'Error fetching messages';
            try {
                const e = JSON.parse(JSON.stringify(error));
                if (e?.response?.data?.message) message = e.response.data.message;
                else if (e?.message) message = e.message;
            } catch {
                // keep generic message
            }
            set({ error: message })
        } finally {
            set({ isLoading: false });
        }
    },


}))


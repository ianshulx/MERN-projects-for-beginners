import { axiosInstance } from '@/lib/axios';
import { create } from 'zustand';

interface AuthStore {
    isAdmin: boolean,
    error: string | null,
    isLoading: boolean,

    checkAdminStatus: () => Promise<void>;
    reset: () => void;
}


export const useAuthStore = create<AuthStore>((set) => ({
    isAdmin: false,
    isLoading: false,
    error: null,

    checkAdminStatus: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await axiosInstance.get('/admin/check');
            set({ isAdmin: !!response?.data?.admin });
            // console.log(response);
        } catch (err) {
            let message = 'An error occurred';
            try {
                const parsed = JSON.parse(JSON.stringify(err));
                if (parsed?.response?.data?.message) message = parsed.response.data.message;
                else if (parsed?.message) message = parsed.message;
            } catch {
                // keep generic message
            }
            set({ error: message });
        } finally {
            set({ isLoading: false });
        }
    },

    reset: () => {
        set({ isAdmin: false, isLoading: false, error: null });
    }


}))

import { create } from "zustand";
import { IAddress, IUser } from "../interfaces/interfaces";
import axios from "axios";
import { logout, refreshToken } from "../actions/userActions";

interface UserState {
    user: IUser | null,
    checkingAuth: boolean,
    isAuth: boolean,
    isAdmin: boolean,
    addresses: Array<any> | null,
    selectedAddress: IAddress,
    isLoading: boolean
}

// Initialize a default state
const INITIAL_STATE: UserState = {
    user: null,
    checkingAuth: false,
    isAuth: false,
    isAdmin: false,
    addresses: null,
    selectedAddress: {} as IAddress,
    isLoading: false
}

export const useUserStore = create((set: any, get: any) => ({
    ...INITIAL_STATE,

    setLogin: async (user: IUser) => {
        set(() => ({ isLoading: true }));

        try {
            // const fetchUser = await axios.post(`${process.env.DEV_URI}auth/login`, { email, password }, { withCredentials: true });
            // const user = fetchUser.data

            set(() => ({ user: user, isAuth: true, isAdmin: user.role === 'admin', }));

        } catch (error) {
        }

        set(() => ({ isLoading: false, isAuth: true }));
    },

    setLogout: async () => {
        set(() => ({ isLoading: true }));

        /*         fetch(`${process.env.DEV_URI}auth/logout`, {
                    credentials: 'include',
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
                ).then((res) => {
                    console.log(res);
        
                });
                       */
        // const response = await axios.post(`${process.env.DEV_URI}auth/logout`, { credentials: 'include' }, { withCredentials: true });
        await logout();

        set(() => ({ user: null, isAuth: false, isAdmin: false, }));


        set(() => ({ isLoading: false }));
    },

    checkAuth: async (user: IUser | null) => {
        try {
            set(() => ({ isLoading: true }));
            // const fetchUser = await axios.get(`${process.env.DEV_URI}auth/profile`, { withCredentials: true });
            // const user = fetchUser.data

            set(() => ({ user: user, isAuth: true, isAdmin: user?.role === 'admin', }));
        } catch (error) {
            set(() => ({ user: null, isAuth: false }));
        }
        set(() => ({ checkingAuth: false, isLoading: false }));
    },

    setRefreshToken: async () => {
        // Prevent multiple simultaneous refresh attempts
        if (get().checkingAuth) return;

        set({ checkingAuth: true });
        try {
            // const response = await axios.post(`${process.env.DEV_URI}auth/refresh-token`, {}, { withCredentials: true });
            set({ checkingAuth: false });
            // return response.data;
            const response = refreshToken();
            console.log(response);

            return response;
        } catch (error) {
            set({ user: null, checkingAuth: false });
            throw error;
        }
    },

    // updateUserById: async (image: any, id: string | number) => {
    //     try {
    //         const response = await axios.put(`${process.env.DEV_URI}user/updateUserById/${id}`, { imageProfile: image }, { withCredentials: true });
    //         console.log(response.data);

    //         return response.data;
    //     } catch (error) {
    //         throw error;
    //     }
    // },


    uploadImageProfileUser: async (formData: any, id: string | number) => {
        try {
            const response = await axios.post(`${process.env.DEV_URI}user/uploadImageProfileUser/${id}`, formData);

            return response.data;
        } catch (error) {
            throw error;
        }
    },

}));



// Axios interceptor for token refresh
let refreshPromise: any = null;

axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // If a refresh is already in progress, wait for it to complete
                if (refreshPromise) {
                    await refreshPromise;
                    return axios(originalRequest);
                }

                // Start a new refresh process
                refreshPromise = useUserStore.getState().setRefreshToken();
                await refreshPromise;
                refreshPromise = null;

                return axios(originalRequest);
            } catch (refreshError) {
                // If refresh fails, redirect to login or handle as needed
                useUserStore.getState().setLogout();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
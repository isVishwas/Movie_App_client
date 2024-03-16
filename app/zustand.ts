import axios from "axios";
import { create } from "zustand";

// const server = "http://localhost:8080/api";
const server = "http://13.127.141.89:8080/api";

interface State {
    loading: boolean;
    success: boolean;
    error: boolean;
    data: any | null;
    errorData: string | null;
}

const initialState: State = {
    loading: false,
    success: false,
    error: false,
    data: null,
    errorData: null
};


export const useGetMovieData = create<State>((set) => ({
    ...initialState,

    get: async () => {
        set({ ...initialState, loading: true });
        try {
            const res = await axios.get(`${server}/movie`);
            set({ ...initialState, success: true, data: res.data });
        } catch (err: any) {
            console.error("Error in data fetch:", err);
            set({ ...initialState, error: true, errorData: err.message });
        }
    }
}));


export const usePostMovieData = create<State>((set) => ({
    ...initialState,

    post: async (formData: any) => {
        set({ ...initialState, loading: true });
        try {
            const res = await axios.post(`${server}/movie`, formData);
            set({ ...initialState, success: true, data: res.data });
        } catch (err: any) {
            console.error("Error sending data:", err);
            set({ ...initialState, error: true, errorData: err.message });
        }
    },
}));

export const useGetReviewData = create<State>((set) => ({
    ...initialState,

    get: async () => {
        set({ ...initialState, loading: true });
        try {
            const res = await axios.get(`${server}/review`);
            set({ ...initialState, success: true, data: res.data });
        } catch (err: any) {
            console.error("Error in data fetch:", err);
            set({ ...initialState, error: true, errorData: err.message });
        }
    },
}));

export const usePostReviewData = create<State>((set) => ({
    ...initialState,

    post: async (formData: any) => {
        set({ ...initialState, loading: true });
        try {
            const res = await axios.post(`${server}/review`, formData);
            set({ ...initialState, success: true, data: res.data });
        } catch (err: any) {
            console.error("Error sending data:", err);
            set({ ...initialState, error: true, errorData: err.message });
        }
    },
}));



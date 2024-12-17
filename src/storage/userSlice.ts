import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    userId: number | null;
    username: string;
    email: string;
    photoUrl: string;
}

const initialState: UserState = {
    userId: null,
    username: "",
    email: "",
    photoUrl: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (
            state,
            action: PayloadAction<{
                id: number;
                username: string;
                email: string;
                photoUrl: string;
            }>
        ) => {
            state.userId = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.photoUrl = action.payload.photoUrl;
        },
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

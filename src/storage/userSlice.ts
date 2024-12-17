import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// createting interface for user
interface UserState {
    userId: number | null;
    username: string;
    email: string;
    photoUrl: string;
}
// intializing state
const initialState: UserState = {
    userId: null,
    username: "",
    email: "",
    photoUrl: "",
};

// creating user slice

const userSlice = createSlice({
    name: "user", // name of the slice
    initialState, // initial state
    reducers: {
        setUser: (state, action: PayloadAction<UserState>) => {
            // setting user data in redux
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;

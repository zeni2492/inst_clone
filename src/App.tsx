//react
import { Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
//pages
import { MainPage } from "./pages/MainPage";
import { FindPage } from "./pages/FindPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingPage";
import { AuthPage } from "./pages/AuthPage";
import { Subscribers } from "./pages/Subscribers";
import { Subscriptions } from "./pages/Subscriptions";
//components
import { HeaderComponent } from "./components/HeaderComponent";
import { NavBar } from "./components/NavBar";
import { PhoneNavComponent } from "./components/PhoneNavComponent";

import DefaltUser from "./assets/user-svgrepo-com.svg";
import { OtherProfilePage } from "./pages/OtherUserPage";

export type UserState = {
    id: number;
    userId: number;
    username: string;
    email: string;
    photo_url: string;
    photoUrl?: string;
};

export type photo = {
    id: number;
    user_id: number;
    photo_url: string;
    description: string;
    username: string;
    user_photo: string;
};

export type User = {
    id: number;
    user_id: number;
    username: string;
    email: string;
    photo_url: string;
};

export type subscriberType = {
    created_at: string;
    id: number;
    subscribed_to_id: number;
    subscriber_id: number;
};

function App() {
    const location = useLocation(); //location hook to disable navbar on some pages
    const noNav = ["/auth"];
    const { userId, photoUrl } = useSelector(
        //getting data from redux
        (state: { user: UserState }) => state.user
    );

    let image = `http://localhost:2492${photoUrl}?t=${Date.now()}`; //proper image url

    if (photoUrl === null) {
        image = DefaltUser; //default image
    }

    return (
        <div className="Container">
            {!noNav.includes(location.pathname) && <NavBar image={image} />}{" "}
            {/*conditionally rendering navbar*/}
            <div className="Content">
                <div className="Header__Container">
                    {!noNav.includes(location.pathname) && <HeaderComponent />}
                </div>
                {/* Routes */}
                <Routes>
                    <Route index path="/" element={<MainPage />} />
                    <Route path="/profile/:id" element={<OtherProfilePage />} />
                    <Route path="/find" element={<FindPage />} />
                    <Route
                        path={`/profile/${userId}`}
                        element={<ProfilePage image={image} />}
                    />
                    <Route
                        path="/settings/"
                        element={<SettingsPage image={image} />}
                    />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/subscribers" element={<Subscribers />} />
                    <Route path="/subscriptions" element={<Subscriptions />} />
                </Routes>
            </div>
            <div className="PhoneNavComponent__Container">
                <PhoneNavComponent userID={userId} />
            </div>
        </div>
    );
}

export default App;

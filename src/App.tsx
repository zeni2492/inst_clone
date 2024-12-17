import { Route, Routes, useLocation } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { FindPage } from "./pages/FindPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingPage";
import { useSelector } from "react-redux";
import { HeaderComponent } from "./components/HeaderComponent";
import { NavBar } from "./components/NavBar";
import { PhoneNavComponent } from "./components/PhoneNavComponent";
import { AuthPage } from "./pages/AuthPage";
function App() {
    const location = useLocation();
    const noNav = ["/auth"];
    const { userId, photoUrl } = useSelector(
        (state: { user: UserState }) => state.user
    );

    const image = `http://localhost:2492${photoUrl}`;

    return (
        <div className="Container">
            {!noNav.includes(location.pathname) && <NavBar image={image} />}

            <div className="Content">
                <div className="Header__Container">
                    {!noNav.includes(location.pathname) && <HeaderComponent />}
                </div>
                <Routes>
                    <Route index path="/" element={<MainPage />} />
                    <Route path="/find" element={<FindPage />} />
                    <Route
                        path={`/profile/${userId}`}
                        element={<ProfilePage />}
                    />
                    <Route
                        path="/settings/"
                        element={<SettingsPage image={image} />}
                    />
                    <Route path="/auth" element={<AuthPage />} />
                </Routes>
            </div>
            <div className="PhoneNavComponent__Container">
                <PhoneNavComponent />
            </div>
        </div>
    );
}

export default App;

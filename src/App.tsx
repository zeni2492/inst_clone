import { Route, Routes, useLocation } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { FindPage } from "./pages/FindPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingPage";

import { HeaderComponent } from "./components/HeaderComponent";
import { NavBar } from "./components/NavBar";
import { PhoneNavComponent } from "./components/PhoneNavComponent";
import { AuthPage } from "./pages/AuthPage";

function App() {
    const location = useLocation();
    const noNav = ["/auth"];
    return (
        <div className="Container">
            {!noNav.includes(location.pathname) && <NavBar />}

            <div className="Content">
                <div className="Header__Container">
                    {!noNav.includes(location.pathname) && <HeaderComponent />}
                </div>
                <Routes>
                    <Route index path="/" element={<MainPage />} />
                    <Route path="/find" element={<FindPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
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

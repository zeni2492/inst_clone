import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { FindPage } from "./pages/FindPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingPage";

import { HeaderComponent } from "./components/HeaderComponent";
import { NavBar } from "./components/NavBar";
import { PhoneNavComponent } from "./components/PhoneNavComponent";

function App() {
    return (
        <div className="Container">
            <NavBar />

            <div className="Content">
                <div className="Header__Container">
                    <HeaderComponent />
                </div>
                <Routes>
                    <Route index path="/" element={<MainPage />} />
                    <Route path="/find" element={<FindPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                </Routes>
            </div>
            <div className="PhoneNavComponent__Container">
                <PhoneNavComponent />
            </div>
        </div>
    );
}

export default App;

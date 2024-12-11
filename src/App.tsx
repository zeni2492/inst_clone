import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { FindPage } from "./pages/FindPage";
import { ProfilePage } from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingPage";

import { HeaderComponent } from "./components/HeaderComponent";
import { NavBar } from "./components/NavBar";
import { PhoneNavComponent } from "./components/PhoneNavComponent";

import { useState } from "react";

import MenuIcon from "./assets/menu-svgrepo-com.svg";

function App() {
    const [width, setWidth] = useState<string>("20%");
    const [margin, setMargin] = useState<string>("0px");
    const toggleNavBar = () => {
        setWidth((prevWidth) => (prevWidth === "0px" ? "20%" : "0px"));
        changeMargin();
    };

    const changeMargin = () => {
        setMargin(width === "0px" ? "20%" : "0px");
    };

    return (
        <div className="Container">
            <NavBar width={width} CloseNavBar={toggleNavBar} />
            {width === "0px" ? (
                <div>
                    <button className="MenuButton" onClick={toggleNavBar}>
                        <img className="MenuIcon" src={MenuIcon} alt="" />
                    </button>
                </div>
            ) : null}

            <div className="Content" style={{ marginLeft: margin }}>
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
            <div>
                <PhoneNavComponent />
            </div>
        </div>
    );
}

export default App;

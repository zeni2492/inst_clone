import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { FindPage } from "./pages/FindPage";
import { ProfilePage } from "./pages/ProfilePage";

import { HeaderComponent } from "./components/HeaderComponent";

import "./App.css";

function App() {
    return (
        <>
            <HeaderComponent />

            <Routes>
                <Route index path="/" element={<MainPage />} />
                <Route path="/find" element={<FindPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </>
    );
}

export default App;

import { Link } from "react-router";

export const HeaderComponent = () => {
    return (
        <header className="Header">
            <h1 className="Header__logo">Instagram</h1>
            <nav className="Header__nav">
                <Link to="/" className="Header__HomeLink">
                    Home
                </Link>
                <Link to="/find" className="Header__FindLink">
                    Find
                </Link>
                <Link to="/profile" className="Header__ProfileLink">
                    Profile
                </Link>
            </nav>
        </header>
    );
};

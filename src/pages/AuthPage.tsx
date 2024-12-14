import { useEffect, useState } from "react";

export const AuthPage = () => {
    const [isLogging, setIsLogging] = useState(false);

    return (
        <div className="AuthPage">
            <div className="AuthPage__Container">
                <h1 className="AuthPage__Title">
                    Auth<span className="AuthPage__AuthHalfText">Page</span>
                </h1>
                <div className="AuthPage__Image"></div>
                <div className="AuthPage__Login">
                    <form className="AuthPage__Form" action="">
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <div>
                            <button type="submit">Log in</button>
                        </div>
                        <p>
                            Have no account? <span>create it right now</span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

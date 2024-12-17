import React, { useState } from "react";
import facebook from "../assets/social/fb.svg";
import google from "../assets/social/google.svg";
import { useDispatch } from "react-redux";
import { setUser } from "../storage/userSlice";
import { useNavigate } from "react-router";

export const AuthPage = () => {
    const [isLogging, setIsLogging] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const dispatch = UseDispatch();
    const Login = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (username === "" || password === "") {
            alert("Please fill in all fields");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }
        try {
            const response = await fetch(
                "http://localhost:2492/api/user/login", //query to login user
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        // data to send to server
                        username: username,
                        password: password,
                    }),
                }
            );

            if (response.status === 200) {
                const data = await response.json();
                // Сохраняем данные о пользователе в Redux
                dispatch(
                    //save user data in redux
                    setUser({
                        userId: data.user.id,
                        username: data.user.username,
                        email: data.user.email,
                        photoUrl: data.user.photo_url, // Добавляем фото пользователя, если оно есть
                    })
                );
                // if response status is 200 then user is logged in and navigate to feed
                navigate("/");
            } else {
                const data = await response.json();
                alert(data.message || "Invalid credentials");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server error. Please try again later.");
        }
        //clear input fields
        setUserName("");
        setPassword("");
    };

    const Registration = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (username === "" || email === "" || password === "") {
            alert("Please fill in all fields");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long");
            return;
        }
        try {
            const response = await fetch(
                "http://localhost:2492/api/user/register", //query to register user
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        // data to send to server
                        username: username,
                        email: email,
                        password: password,
                    }),
                }
            );

            if (response.status === 201) {
                const data = await response.json();
                dispatch(
                    //save user data in redux
                    setUser({
                        userId: data.user.id,
                        username: data.user.username,
                        email: data.user.email,
                        photoUrl: data.user.photo_url, // Добавляем фото пользователя, если оно есть
                    })
                );
                // if response status is 201 then user is registered and navigate to feed
                navigate("/");
            } else {
                const data = await response.json();
                alert(data.message || "Something went wrong");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server error. Please try again later.");
        }
        //clear input fields
        setUserName("");
        setEmail("");
        setPassword("");
    };

    //toggle between login and registration
    const toggleRegistration = (e: React.MouseEvent<HTMLButtonElement>) => {
        setIsLogging(!isLogging);
        e.preventDefault();
    };
    return (
        <div className="AuthPage">
            {!isLogging ? ( //if isLogging is false then show login form
                <div className="AuthPage__Container">
                    <h1 className="AuthPage__Title">
                        Auth<span className="AuthPage__AuthHalfText">Page</span>
                    </h1>
                    <aside className="AuthPage__Image"></aside>
                    <div className="AuthPage__Login AuthPage__LoginContainer">
                        <form className="AuthPage__Form" action="">
                            <input
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                                className="AuthPage__LoginInput"
                                type="text"
                                placeholder="Login"
                            />
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="AuthPage__PasswordInput"
                                type="password "
                                placeholder="Password"
                            />
                            <div className="AuthPage__LoginButtonContainer">
                                <button
                                    onClick={Login}
                                    className="AuthPage__LoginButton"
                                    type="submit"
                                >
                                    Log in
                                </button>
                            </div>
                            <p className="AuthPage__HaveNoAccount">
                                Have no account?
                                <span
                                    onClick={toggleRegistration}
                                    className="AuthPage__Create"
                                >
                                    create it right now
                                </span>
                            </p>
                            <div className="AuthPage__SocialNetworksContainer">
                                <h2 className="AuthPage__Or">or</h2>
                                <div className="AuthPage__SocialNetworks">
                                    <button className="AuthPage__Google AuthPage__Social">
                                        <img src={google} alt="" /> Google
                                    </button>
                                    <button className="AuthPage__Facebook AuthPage__Social">
                                        <img src={facebook} /> Facebook
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                //if isLogging is true then show registration form
                <div className="AuthPage__Container">
                    <h1 className="AuthPage__Title" id="Registration">
                        <span id="Registration__AuthHalfText">Auth</span>
                        page
                    </h1>
                    <div
                        className="AuthPage__Login"
                        id="AuthPage__Registration"
                    >
                        <form className="AuthPage__Form" action="">
                            <input
                                className="AuthPage__LoginInput"
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                className="AuthPage__LoginInput"
                                type="text"
                                placeholder="Login"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <input
                                className="AuthPage__PasswordInput"
                                type="password "
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="AuthPage__LoginButtonContainer">
                                <button
                                    onClick={Registration}
                                    className="AuthPage__LoginButton"
                                    type="submit"
                                >
                                    Sign up
                                </button>
                            </div>
                            <p className="AuthPage__HaveNoAccount">
                                Already have an account?{" "}
                                <span
                                    className="AuthPage__Create"
                                    onClick={toggleRegistration}
                                >
                                    Log in
                                </span>
                            </p>
                        </form>
                        <div className="AuthPage__SocialNetworksContainer">
                            <h2 className="AuthPage__Or">or</h2>
                            <div className="AuthPage__SocialNetworks">
                                <button className="AuthPage__Google AuthPage__Social">
                                    <img src={google} alt="" /> Google
                                </button>
                                <button className="AuthPage__Facebook AuthPage__Social">
                                    <img src={facebook} /> Facebook
                                </button>
                            </div>
                        </div>
                    </div>
                    <aside className="AuthPage__Image"></aside>
                </div>
            )}
        </div>
    );
};

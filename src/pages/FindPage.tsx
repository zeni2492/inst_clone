import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import defaultUser from "../assets/user-svgrepo-com.svg";

type User = {
    id: number;
    username: string;
    email: string;
    photo_url: string;
};

export const FindPage = () => {
    const [users, setUsers] = useState([]);
    const [Search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    //query to get all users
    const getUsers = async () => {
        const response = await fetch("http://localhost:2492/api/user/getAll");
        const data = await response.json();
        setUsers(data);
        console.log(data);
    };

    function redirect(id: number) {
        navigate(`/profile/${id}`);
    }

    useEffect(() => {
        if (Search === "") {
            setSearchResults(users); // if search is empty, show all users
        } else {
            const results = users.filter(
                (
                    user: User // filter users by nickname
                ) => user.username.toLowerCase().includes(Search.toLowerCase())
            );
            setSearchResults(results);
        }
    }, [Search, users]);

    useEffect(() => {
        getUsers();
    }, []);
    return (
        <div className="FindPage">
            <div className="FindPage__Container">
                {/* Поле ввода для поиска */}
                <div className="FindPage__Search">
                    <input
                        placeholder="Search"
                        className="FindPage__input"
                        type="text"
                        value={Search}
                        onChange={(e) => setSearch(e.target.value)} // Обновляем значение поиска
                    />
                </div>
                <div className="FindPage__Users">
                    {/* Список пользователей */}
                    {searchResults.length > 0 ? (
                        searchResults.map((user: User) => (
                            <div
                                onClick={() => redirect(user.id)}
                                className="FindPage__User"
                                key={user.id}
                            >
                                <div className="FindPage__image">
                                    <img
                                        className="FindPage__avatar"
                                        src={
                                            user.photo_url !== null
                                                ? `http://localhost:2492${user.photo_url}`
                                                : defaultUser
                                        }
                                        alt="User Avatar"
                                    />
                                </div>
                                <div className="FindPage__username">
                                    <h2 className="FindPage__name">
                                        {user.username}
                                    </h2>
                                    <p className="FindPage__email">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>Пользователи не найдены</p>
                    )}
                </div>
            </div>
        </div>
    );
};

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../storage/userSlice";
import { UserState } from "../App";

export const SettingsPage = ({ image }: { image: string }) => {
    const [name, setName] = useState<string>("User"); // начальное значение
    const [status, setStatus] = useState<string>(""); // начальное значение
    const [edit, setEdit] = useState(false);
    const { username, userId } = useSelector(
        (state: { user: UserState }) => state.user
    );
    const dispatch = useDispatch();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            changeAvatar(file);
        }
    };

    const getUserInfo = async () => {
        try {
            const response = await fetch(
                `http://localhost:2492/api/user/getUser?id=${userId}`
            );
            const data = await response.json();
            console.log(data);

            // Убедитесь, что data.name и data.status существуют
            setName(data.name ?? "User"); // Если name отсутствует, используйте "User"
            setStatus(data.status ?? ""); // Если status отсутствует, используйте пустую строку
        } catch (error) {
            console.error("Error fetching user info:", error);
            setName("User"); // Значение по умолчанию
            setStatus(""); // Значение по умолчанию
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    const changeAvatar = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("image", file);

            const response = await fetch(
                `http://localhost:2492/api/profile/settings/image/${userId}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (data?.photoUrl) {
                dispatch(
                    setUser({
                        userId,
                        username,
                        email: "",
                        photoUrl: data.photoUrl,
                    })
                );
            }
        } catch (error) {
            console.error("Error changing avatar:", error);
        }
    };

    return (
        <div className="SettingsPage">
            <div className="SettingsPage__Container">
                <label className="SettingsPage__UserIcon">
                    <img
                        className="SettingsPage__Image"
                        src={image}
                        alt="User"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                    />
                </label>

                <form onSubmit={(e) => e.preventDefault()}>
                    <input
                        className="SettingsPage__Input"
                        placeholder="Name"
                        value={name} // значение никогда не будет undefined
                        onChange={(e) => setName(e.target.value)}
                        disabled={!edit}
                    />
                    <input
                        className="SettingsPage__Input"
                        placeholder="Status"
                        value={status} // значение никогда не будет undefined
                        onChange={(e) => setStatus(e.target.value)}
                        disabled={!edit}
                    />
                    <button
                        className="SettingsPage__Button"
                        type="button"
                        onClick={() => setEdit(!edit)}
                    >
                        {edit ? "Save" : "Edit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

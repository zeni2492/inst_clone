import { useState } from "react";
import User from "../assets/user-svgrepo-com.svg";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../storage/userSlice"; // Импорт действия Redux для обновления данных
import { UserState } from "./ProfilePage";

export const SettingsPage = ({ image }: { image: string }) => {
    const [name, setName] = useState<string>("User");
    const [status, setStatus] = useState<string>("");
    const [edit, setEdit] = useState(false);
    const { username, userId } = useSelector(
        (state: { user: UserState }) => state.user
    );
    const dispatch = useDispatch();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Получаем файл из инпута
        if (file) {
            const reader = new FileReader(); // Создаем экземпляр FileReader
            reader.onloadend = () => {
                // changeAvatar(reader.result as string); // Устанавливаем результат в состояние
            };
            reader.readAsDataURL(file); // Читаем файл как Data URL
            changeAvatar(file); // Передаем файл в функцию для отправки на сервер
        }
    };

    const changeAvatar = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("image", file); // Добавляем изображение в FormData

            const response = await fetch(
                `http://localhost:2492/api/profile/settings/image/${userId}`,
                {
                    method: "POST",
                    body: formData, // Отправляем FormData
                }
            );

            const data = await response.json();
            if (data?.photoUrl) {
                // Если сервер вернул photoUrl, обновляем его в стейте
                dispatch(setUser({ ...data, photoUrl: data.photoUrl }));
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="SettingsPage">
            <div className="SettingsPage__Container">
                <label className="SettingsPage__UserIcon">
                    <img
                        className="SettingsPage__Image"
                        src={image || User} // Если изображение загружено, используем его, иначе фото из стейта или иконку по умолчанию
                        alt="User"
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange} // Обработчик изменения
                        style={{ display: "none" }} // Скрываем инпут
                    />
                </label>
                <div>
                    <button
                        onClick={() => {
                            setEdit(!edit);
                        }}
                    >
                        {edit ? "Save" : "Edit"}
                    </button>
                </div>

                <form className="SettingsPage__Form" action="">
                    {edit ? (
                        <div>
                            <div className="SettingsPage__UserChangeInfo">
                                <p>{username}</p>
                            </div>
                            <div>
                                <p>{status}</p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

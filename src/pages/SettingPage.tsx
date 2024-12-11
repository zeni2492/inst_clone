import { useState } from "react";
import User from "../assets/user-svgrepo-com.svg";

export const SettingsPage = () => {
    const [image, setImage] = useState<string | null>(null); // Состояние для сохранения выбранного изображения
    const [name, setName] = useState<string>("User");
    const [status, setStatus] = useState<string>("");
    const [gender, setGender] = useState<string | null>("");
    const [edit, setEdit] = useState(false);

    // Обработчик изменения изображения
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]; // Получаем файл из инпута
        if (file) {
            const reader = new FileReader(); // Создаем экземпляр FileReader
            reader.onloadend = () => {
                setImage(reader.result as string); // Устанавливаем результат в состояние
            };
            reader.readAsDataURL(file); // Читаем файл как Data URL
        }
    };

    return (
        <div className="SettingsPage">
            <div className="SettingsPage__Container">
                <label className="SettingsPage__UserIcon">
                    <img
                        className="SettingsPage__Image"
                        src={image || User} // Если изображение загружено, используем его, иначе иконку по умолчанию
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
                                <p>{name}</p>
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

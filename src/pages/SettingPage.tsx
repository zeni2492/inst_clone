import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../storage/userSlice";

export const SettingsPage = ({ image }: { image: string }) => {
    const [name, setName] = useState<string>("User"); // user name state
    const [status, setStatus] = useState<string>(""); // user status state
    const [edit, setEdit] = useState(false); //enable edit mode
    const { username, userId } = useSelector(
        (state: { user: UserState }) => state.user
    ); //getting data from redux
    const dispatch = useDispatch();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //uploading image by click on avatar
        const file = event.target.files?.[0];
        if (file) {
            changeAvatar(file);
        }
    };

    const changeAvatar = async (file: File) => {
        try {
            const formData = new FormData(); // create a FormData object
            formData.append("image", file); // append the image file

            const response = await fetch(
                // query the server to change avatar
                `http://localhost:2492/api/profile/settings/image/${userId}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await response.json();

            if (data?.photoUrl) {
                // update user data in Redux
                dispatch(
                    setUser({
                        userId,
                        username,
                        email: "",
                        photoUrl: data.photoUrl, // update photoUrl
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

                <div>
                    <button onClick={() => setEdit(!edit)}>
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

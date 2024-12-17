import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { photo, UserState } from "../App";
import { ImagesComponent } from "../components/ProfileImagesComponent";

import DefaultUser from "../assets/user-svgrepo-com.svg";

//temporary images for profile

export const ProfilePage = ({ image }: { image: string }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [PhotoList, setPhotoList] = useState<photo[]>([]); // list of images
    const [follow, setFollow] = useState(false); //follow state
    const { username } = useSelector(
        //getting data from redux
        (state: { user: UserState }) => state.user
    );

    function Follow() {
        setFollow(!follow);
    }
    const getImages = async () => {
        const response = await axios.get(
            "http://localhost:2492/api/photo/getAll" //query to get images
        );
        setPhotoList(response.data); //set images
        setIsLoading(false); // download is finished
    };

    useEffect(() => {
        getImages();
    }, []);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    return (
        <main className="ProfilePage__container">
            <div className="ProfilePage">
                <div className="ProfilePage__user">
                    <img
                        className="ProfilePage__avatar"
                        src={image.length > 0 ? image : DefaultUser}
                        alt=""
                    />
                    <div className="ProfilePage__Follow">
                        <button
                            onClick={Follow}
                            className="ProfilePage__Follow-button"
                        >
                            {follow ? "✓" : "+"}
                        </button>
                    </div>
                    <div className="ProfilePage__username">
                        <h2>{username || "User"}</h2>
                    </div>
                    <div></div>
                    <div className="ProfilePage__statistics">
                        <ul className="ProfilePage__statsics-list">
                            <li className="ProfilePage__statistics-item">
                                <h2>Followers</h2>
                                <p>100</p>
                            </li>
                            <li className="ProfilePage__statistics-item">
                                <h2>Posts</h2>
                                <p>{PhotoList.length}</p>
                            </li>
                            <li className="ProfilePage__statistics-item">
                                <h2>Follows</h2>
                                <p>100</p>
                            </li>
                        </ul>
                    </div>

                    <nav className="ProfilePage__new-post">
                        <button type="button" className="ProfilePage__button">
                            New Post
                        </button>
                    </nav>

                    <div className="ProfilePage__Images">
                        <ImagesComponent image={PhotoList} />
                    </div>
                </div>
            </div>
        </main>
    );
};

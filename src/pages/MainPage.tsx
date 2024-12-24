import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ImagesComponent } from "../components/ProfileImagesComponent";

import { photo, UserState } from "../App";
import { getSocialStats } from "../api/api";
import DefaulUser from "../assets/user-svgrepo-com.svg";

export const MainPage = () => {
    const [images, setImages] = useState<photo[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = useSelector((state: { user: UserState }) => state.user);
    const navigate = useNavigate();

    const getPhotos = async () => {
        const response = await getSocialStats(
            "http://localhost:2492/api/photo/getSubscribedPhotos",
            userId
        );
        const data = response;

        if (!data) {
            return;
        }
        setImages(data);
        setIsLoading(false);
    };

    useEffect(() => {
        getPhotos();
    }, []);

    return (
        <div className="MainPage">
            <div className="MainPage__Container">
                <h1 className="MainPage__Title">Recomendation</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <div className="MainPage__Container__Images">
                        {images.map((image) => (
                            <div className="MainPage__Images" key={image.id}>
                                <div className="MainPage__Images_User__Container">
                                    <div className="MainPage__Images_User">
                                        <img
                                            className="avatar"
                                            onClick={() => {
                                                navigate(
                                                    `/profile/${image.user_id}`
                                                );
                                            }}
                                            src={
                                                image.user_photo === null
                                                    ? DefaulUser
                                                    : `http://localhost:2492${image.user_photo}`
                                            }
                                            alt=""
                                        />
                                        <h2>{image.username}</h2>
                                    </div>
                                </div>
                                <ImagesComponent image={image} />
                                <p className="MainPage__Images_Description">
                                    {image.description}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

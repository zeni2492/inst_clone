import { useEffect, useState } from "react";
import axios from "axios";

import { ImagesComponent } from "../components/ProfileImagesComponent";

import DefaultUser from "../assets/user-svgrepo-com.svg";

export type FetchedData = {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
        name: string;
        url: string;
    };
    location: {
        name: string;
        url: string;
    };
    image: string;
    episode: [];
    url: string;
    created: string;
};

export const ProfilePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [PhotoList, setPhotoList] = useState<FetchedData[]>([]);
    const [follow, setFollow] = useState(false);

    function Follow() {
        setFollow(!follow);
    }
    const getImages = async () => {
        const response = await axios.get(
            "https://rickandmortyapi.com/api/character"
        );
        setPhotoList(response.data.results);
        setIsLoading(false);
    };

    useEffect(() => {
        getImages();
    }, []);

    console.log(PhotoList);

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    const say = () => {
        console.log("dasdadsd");
    };

    return (
        <main className="ProfilePage__container">
            <div className="ProfilePage">
                <div className="ProfilePage__user">
                    <img
                        onClick={say}
                        className="ProfilePage__avatar"
                        src={DefaultUser}
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
                        <h2>Username</h2>
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
                    <div className="ProfilePage__Images">
                        <ImagesComponent image={PhotoList} />
                    </div>
                </div>
            </div>
        </main>
    );
};

import { useState } from "react";

import { FetchedData } from "../pages/ProfilePage";
import filledHeart from "../assets/PostActions/filledHearth.svg";
import emptyHeart from "../assets/PostActions/emptyHearth.svg";
import comment from "../assets/PostActions/comment.svg";
import share from "../assets/PostActions/share.svg";

export function ImagesComponent({ image }: { image: FetchedData[] }) {
    // state for storing likes
    const [likes, setLikes] = useState<{ [key: number]: boolean }>({});

    // function for handling likes
    function likePhoto(id: number) {
        setLikes((prevLikes) => ({
            ...prevLikes,
            [id]: !prevLikes[id], // switches the state of the like for the given id
        }));
    }

    return (
        <div>
            <div className="ProfilePage__Photos">
                {image.map((photo) => (
                    <div key={photo.id}>
                        <img
                            onDoubleClick={() => likePhoto(photo.id)} // get the id of the photo
                            className="ProfilePage__Photo"
                            src={photo.image}
                            alt={photo.name}
                        />
                        <div className="PostActions__Container">
                            <div
                                onClick={() => likePhoto(photo.id)}
                                className="PostActions"
                            >
                                <img
                                    src={
                                        // display filled or empty heart depending on the state
                                        likes[photo.id]
                                            ? filledHeart
                                            : emptyHeart
                                    }
                                />
                            </div>

                            <div className="PostActions">
                                <img src={comment} alt="" />
                            </div>
                            <div className="PostActions">
                                <img src={share} alt="" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

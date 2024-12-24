import { useState } from "react";
import { photo } from "../App";
import { Modal } from "./Modal";

export function ImagesComponent({ image }: { image: photo }) {
    // state for storing likes
    const [selectedPhoto, setSelectedPhoto] = useState<photo | null>(null);

    // function for handling likes

    function openModal(photo: photo) {
        console.log(image.photo_url);

        setSelectedPhoto(photo);
    }

    function closeModal() {
        setSelectedPhoto(null);
    }

    return (
        <div className="ProfilePage__Container">
            <div className="ProfilePage__Photos">
                <div className="ProfilePage__PhotoContainer" key={image.id}>
                    <img
                        onClick={() => openModal(image)}
                        className="ProfilePage__Photo"
                        src={`http://localhost:2492${image.photo_url}`}
                    />
                </div>
                {selectedPhoto && (
                    <Modal
                        isOpen={!!selectedPhoto}
                        image={selectedPhoto}
                        onClose={closeModal}
                    />
                )}
            </div>
        </div>
    );
}

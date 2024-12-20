import { useState } from "react";
import { photo } from "../App";
import { Modal } from "./Modal";

export function ImagesComponent({ image }: { image: photo[] }) {
    // state for storing likes
    const [selectedPhoto, setSelectedPhoto] = useState<photo | null>(null);

    // function for handling likes

    function openModal(photo: photo) {
        setSelectedPhoto(photo);
    }

    function closeModal() {
        setSelectedPhoto(null);
    }

    return (
        <div>
            <div className="ProfilePage__Photos">
                {image.map((photo) => (
                    <div className="ProfilePage__PhotoContainer" key={photo.id}>
                        <img
                            onClick={() => openModal(photo)}
                            className="ProfilePage__Photo"
                            src={`http://localhost:2492${photo.photo_url}`}
                        />
                    </div>
                ))}
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

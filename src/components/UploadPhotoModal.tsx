import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { UserState } from "../App";

interface ModalProps {
    onClose: () => void;
    isOpen: boolean;
}

export const UploadPhotoModal = ({ isOpen, onClose }: ModalProps) => {
    const { userId } = useSelector((state: UserState) => state.user);
    const [file, setFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);
    const [description, setDescription] = useState("");

    const closeModal = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragging(false);
        const droppedFiles = e.dataTransfer.files;
        if (droppedFiles.length > 0) {
            const newFile = droppedFiles[0];
            setFile(newFile);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    useEffect(() => {
        if (file) {
            const fileUrl = URL.createObjectURL(file);
            setPreviewUrl(fileUrl);

            return () => URL.revokeObjectURL(fileUrl);
        }
    }, [file]);

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append("photo", file!);
        formData.append("description", description);
        formData.append("user_id", userId);
        try {
            await fetch("http://localhost:2492/api/photo/upload", {
                method: "POST",
                body: formData,
            });
        } catch (e) {
            console.log(e);
        }
        setFile(null);
        setPreviewUrl(null);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="UploadPhotoModal" onClick={closeModal}>
            <div
                className="UploadPhotoModal__Container"
                onClick={(e) => e.stopPropagation()}
            >
                <h1 className="UploadPhotoModal__Title">Upload Photo</h1>

                <div
                    className="UploadPhotoModal__Content"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    style={{
                        border: `4px dashed ${
                            dragging ? "#4CAF50" : "var(--dark)"
                        }`,
                    }}
                >
                    <label htmlFor="fileInput" className="DragAndDrop">
                        <h1 className="DragAndDrop__Text">+</h1>
                        <p>Drag & Drop or Click to Select File</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                            id="fileInput"
                        />
                    </label>
                </div>

                {previewUrl && (
                    <div className="UploadPhotoModal__FilePreview">
                        <img
                            className="UploadPhotoModal__Image"
                            src={previewUrl}
                            alt="Preview"
                        />
                    </div>
                )}

                <div className="UploadPhotoModal__Description">
                    <h2 className="UploadPhotoModal__DescriptionText">
                        Description
                    </h2>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="UploadPhotoModal__TextArea"
                        placeholder="Add a description"
                    ></textarea>
                </div>

                <div className="UploadPhotoModal__Button">
                    <button
                        onClick={uploadImage}
                        className="UploadPhotoModal__Upload"
                    >
                        <h1 className="UploadPhotoModal__UploadText">Upload</h1>
                    </button>
                </div>
            </div>
        </div>
    );
};

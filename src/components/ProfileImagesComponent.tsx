import { FetchedData } from "../pages/ProfilePage";

export function ImagesComponent({ image }: { image: FetchedData[] }) {
    return (
        <div>
            <div className="ProfilePage__Photos">
                {image.map((photo) => (
                    <img
                        className="ProfilePage__Photo"
                        key={photo.id}
                        src={photo.image}
                        alt={photo.name}
                    />
                ))}
            </div>
        </div>
    );
}

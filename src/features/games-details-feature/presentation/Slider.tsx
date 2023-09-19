import React, { useState } from 'react';

import { ReactComponent as Prev } from "../../../Assets/prev.svg";
import { ReactComponent as Next } from "../../../Assets/next.svg";

import "./slider.css";
import { IGame } from '../../../lib/utils/types';
// import myvideo from "../../../Assets/video.mp4";

const images = [
    "https://youtu.be/X0m8bXsdAzA?si=gaZl8mqD8iinyv81",
    "https://kartinkin.net/uploads/posts/2022-02/1645847591_4-kartinkin-net-p-kartinki-gorizontalnie-4.jpg",
    "https://img2.akspic.ru/attachments/originals/5/0/0/8/88005-gorodskoj_pejzazh-gorodskoj_rajon-bruklinskij_most-otrazhenie-metropoliya-2560x1600.jpg",
    "https://million-wallpapers.ru/wallpapers/6/72/473617132264230/nyu-jorkteg-shy-ys-zen-n-st-ndeg-t-ng-bruklin-k-p-r.jpg",
    "https://phonoteka.org/uploads/posts/2022-01/1642640737_45-phonoteka-org-p-fon-zakat-47.jpg",
];

const items = [
    {
        type: 'image',
        thumbnail: 'https://kartinkin.net/uploads/posts/2022-02/1645847591_4-kartinkin-net-p-kartinki-gorizontalnie-4.jpg',
    },
    // {
    //     type: 'video',
    //     src: 'https://assets.mixkit.co/videos/preview/mixkit-man-dancing-under-changing-lights-1240-large.mp4',
    //     thumbnail: 'https://phonoteka.org/uploads/posts/2022-01/1642640737_45-phonoteka-org-p-fon-zakat-47.jpg',
    // },
    {
        type: 'image',
        thumbnail: 'https://million-wallpapers.ru/wallpapers/6/72/473617132264230/nyu-jorkteg-shy-ys-zen-n-st-ndeg-t-ng-bruklin-k-p-r.jpg',
    },
];

const Slider:React.FC<{images?: IGame}> = ({images}) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentImageIndex((curIndex) =>
            curIndex === 0 ? items.length - 1 : curIndex - 1
        );
    };

    const handleNextClick = () => {
        setCurrentImageIndex((curIndex) =>
            curIndex === items.length - 1 ? 0 : curIndex + 1
        );
    };

    return (
        <div className="slider-container">
            <div className="image-container">
                {items[currentImageIndex].type === 'image' ? (
                    <img src={items[currentImageIndex].thumbnail} alt={`Item ${currentImageIndex}`} />
                ) : (
                    <video src={items[currentImageIndex].thumbnail}></video>
                    // <iframe src="https://www.youtube.com/embed/C5q0ULg0nmY?si=uEcjbCohPh0T5QH7" allow="accelerometer; autoplay;; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
                )}
                {/* <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex}`} /> */}
                {/* <div className="arrow-container">
                    <button className="arrow" onClick={handlePrevClick}>
                        <Prev />
                    </button>
                    <button className="arrow" onClick={handleNextClick}>
                        <Next />
                    </button>
                </div> */}
            </div>
            <div className="thumbnail-container">
                {items.map((image, index) => (
                    <div
                        key={index}
                        className={`thumbnail-galery ${index === currentImageIndex ? 'active' : ''}`}
                        onClick={() => setCurrentImageIndex(index)}
                    >
                        <img src={image.thumbnail} alt={`Thumbnail ${index}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Slider;

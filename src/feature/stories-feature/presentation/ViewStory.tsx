import Stories from "stories-react";
import IStories from "../data/storiesDto";

import "./style.css"

import { ReactComponent as Prev } from "../data/icons/prev.svg";
import { ReactComponent as Next } from "../data/icons/next.svg";
import { useRef, useState } from "react";

interface Props {
    stories: IStories[],
    handleCloseClick: () => void,
    handleModalNext: () => void,
    handleModalPrev: () => void,
    group_index: number
}

const ViewStory: React.FC<Props> = ({ stories, handleCloseClick, handleModalNext, handleModalPrev, group_index }) => {

    const [startX, setStartX] = useState(0);
    const mouseRef = useRef<HTMLDivElement | null>(null);


    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setStartX(e.clientX);
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        const endX = e.clientX;
        const deltaX = endX - startX;

        if (deltaX > 50) {
            handleModalPrev();
        } else if (deltaX < -50) {
            handleModalNext();
        }
    };

    return (
        <>
            <div className="stories-container" ref={mouseRef} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
                <div className="close-icon" onClick={handleCloseClick}>
                    &#x2716;
                </div>
                <div className="stories-wrapper">
                    <Stories height="100%"
                        width="100%"
                        key={group_index}
                        stories={stories}
                        onAllStoriesEnd={handleModalNext}
                    />
                    <div className="prev-next">
                        <button onClick={handleModalPrev}>
                            <Prev />
                        </button>
                        <button onClick={handleModalNext}>
                            <Next />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewStory;

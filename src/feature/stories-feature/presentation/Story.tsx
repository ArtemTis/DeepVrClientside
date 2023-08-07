import Stories from "stories-react";
import IStories from "../data/storiesDto";

import "./storyStyles.css"
import "./media.css"

import { ReactComponent as Prev } from "../data/icons/prev.svg";
import { ReactComponent as Next } from "../data/icons/next.svg";
import { useRef, useState } from "react";

interface Props {
    stories: IStories[],
    handleCloseClick: () => void,
    handleModalNext: (index: number, len: number) => void,
    handleModalPrev: (index: number, len: number) => void,
    group_index: number,
    curIndex: number,
    setCurrentIndex: (index: number) => void,
}

const Story: React.FC<Props> = ({ stories, handleCloseClick, handleModalNext, handleModalPrev, group_index, curIndex, setCurrentIndex }) => {

    const [startX, setStartX] = useState(0);
    const mouseRef = useRef<HTMLDivElement | null>(null);
    let currentIndexStory = curIndex;
    let videoClassName = "";

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setStartX(e.clientX);
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
        const endX = e.clientX;
        const deltaX = endX - startX;

        if (deltaX > 50) {
            handleModalPrev(currentIndexStory, stories.length);
        } else if (deltaX < -50) {
            handleModalNext(currentIndexStory, stories.length);
        }
    };

    const setCurrentIndexStory = (index: number) => {
        currentIndexStory = index;
        setCurrentIndex(currentIndexStory);
    }

    if(stories[currentIndexStory].type === 'video') {
        videoClassName = "video-close";
    }
    else {
        videoClassName = "photo-close";
    }

    return (
        <>
            <div className="stories-container" ref={mouseRef} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
                <div className={`close-icon ${videoClassName}`} onClick={handleCloseClick}>
                    &#x2715;
                </div>
                <div className="stories-wrapper">
                    <Stories height="100%"
                        width="100%"
                        key={group_index}
                        stories={stories}
                        onAllStoriesEnd={() => handleModalNext(-1, stories.length)}
                        onStoryChange={(currentIndex: number) => setCurrentIndexStory(currentIndex)}
                        currentIndex={curIndex}
                    />
                    <div className="prev-next">
                        <button onClick={() => handleModalPrev(currentIndexStory, stories.length)}>
                            <Prev />
                        </button>
                        <button onClick={() => handleModalNext(currentIndexStory, stories.length)}>
                            <Next />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Story;

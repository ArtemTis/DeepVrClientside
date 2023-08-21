import Stories from "stories-react";
import { IStories } from "../data/storiesDto";

import { ReactComponent as Prev } from "../data/icons/prev.svg";
import { ReactComponent as Next } from "../data/icons/next.svg";
import { useRef } from "react";

interface Props {
    stories: IStories[],
    handleCloseClick: () => void,
    handleModalNext: (index: number, len: number) => void,
    handleModalPrev: (index: number) => void,
    group_index: number,
    curIndex: number,
    setCurrentIndex: (index: number) => void,
}

const Story: React.FC<Props> = ({ stories, handleCloseClick, handleModalNext, handleModalPrev, group_index, curIndex, setCurrentIndex }) => {

    const mouseRef = useRef<HTMLDivElement | null>(null);
    let videoClassName = "";

    const setCurrentIndexStory = (index: number) => {
        setCurrentIndex(index);
    }

    if(stories[curIndex].type === 'video') {
        videoClassName = "video-close";
    }
    else {
        videoClassName = "photo-close";
    }

    return (
        <>
            <div className="stories-container" ref={mouseRef}>
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
                        <button onClick={() => handleModalPrev(curIndex)}>
                            <Prev />
                        </button>
                        <button onClick={() => handleModalNext(curIndex, stories.length)}>
                            <Next />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Story;

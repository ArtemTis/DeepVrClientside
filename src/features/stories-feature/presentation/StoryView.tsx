import Stories from "stories-react";
import { IStories } from "../data/storiesDto";

import { ReactComponent as Prev } from "../../../assets/prev.svg";
import { ReactComponent as Next } from "../../../assets/next.svg";

interface Props {
    stories: IStories[],
    handleCloseClick: () => void,
    handleModalNext: (index: number, len: number) => void,
    handleModalPrev: (index: number) => void,
    group_index: number,
    curIndex: number,
    setCurrentIndex: (index: number) => void,
}

const ViewStory: React.FC<Props> = ({ stories, handleCloseClick, handleModalNext, handleModalPrev, group_index, curIndex, setCurrentIndex }) => {

    let videoClassName = "";

    if(stories[curIndex].type === 'video') {
        videoClassName = "video-close";
    }
    else {
        videoClassName = "photo-close";
    }

    return (
        <>
            <div className="stories-container">
                <div className={`close-icon ${videoClassName}`} onClick={handleCloseClick}>
                    &#x2715;
                </div>
                <div className="stories-wrapper">
                    <Stories height="100%"
                        width="100%"
                        key={group_index}
                        stories={stories}
                        onAllStoriesEnd={() => handleModalNext(-1, stories.length)}
                        onStoryChange={(currentIndex: number) => setCurrentIndex(currentIndex)}
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

export default ViewStory;

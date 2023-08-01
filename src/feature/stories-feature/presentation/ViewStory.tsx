import Stories from "stories-react";
import IStories from "../data/storiesDto";

import "./style.css"

interface Props {
    stories: IStories[],
    handleCloseClick: () => void,
    handleModalNext: () => void,
    group_index: number
}

const ViewStory: React.FC<Props> = ({ stories, handleCloseClick, handleModalNext, group_index }) => {

    return (
        <>
            <div className="stories-container" >
                <div className="close-icon" onClick={handleCloseClick}>
                    &#x2716;
                </div>
                <Stories height="700px"
                    key={group_index}
                    width="400px"
                    stories={stories}
                    onAllStoriesEnd={handleModalNext}
                />
            </div>
        </>
    )
}

export default ViewStory;

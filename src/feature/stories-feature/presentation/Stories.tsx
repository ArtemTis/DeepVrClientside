import { useState } from "react";

import IThumbnail from "../data/thumbnailDto";
import IStories from "../data/storiesDto";
import StoryThumbnail from "./StoryThumbnail";
import ViewStory from "./ViewStory";

interface Props {
    stories: IStories[];
    thumbnails: IThumbnail[];
}

const Stories: React.FC<Props> = ({ stories, thumbnails }) => {

    const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(-1);

    const handleModalOpen = (index: number) => {
        setActiveThumbnailIndex(index + 1);
    };

    const handleModalNext = () => {
        if (activeThumbnailIndex === thumbnails.length) {
            handleModalClose();
        }
        else {
            setActiveThumbnailIndex(activeThumbnailIndex + 1);
        }
    };

    const handleModalClose = () => {
        setActiveThumbnailIndex(-1);
    }

    return (
        <div className="stories">
            {thumbnails.map((thumbnail: IThumbnail, index: number) => (
                <StoryThumbnail
                    key={index}
                    setActiveStory={handleModalOpen}
                    index={index}
                    thumbnail={thumbnail}
                />
            ))}

            {activeThumbnailIndex !== -1 && (
                <ViewStory stories={stories.filter((store) => store.stories_group_id === activeThumbnailIndex)}
                    handleCloseClick={handleModalClose}
                    handleModalNext={handleModalNext}
                    group_index={activeThumbnailIndex}
                />
            )}
        </div>
    )
}

export default Stories;

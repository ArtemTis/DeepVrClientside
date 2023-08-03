import { useEffect, useState } from "react";

import IThumbnail from "../data/thumbnailDto";
import IStories from "../data/storiesDto";
import StoryThumbnail from "./StoryThumbnail";
import Story from "./Story";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { selectStories, selectThumbnails } from "../store/selectors";
import { getAllStories, getAllThumbnails } from "../store/asyncActions";


const Stories = () => {

    const dispatch = useAppDispatch();
    const stories = useAppSelector(selectStories);
    const thumbnails = useAppSelector(selectThumbnails);

    useEffect(() => {
        dispatch(getAllStories());
        dispatch(getAllThumbnails());
    }, []);

    const [activeThumbnailIndex, setActiveThumbnailIndex] = useState(-1);
    const [currentIndexStory, setCurrentIndexStory] = useState(0);

    const handleModalOpen = (index: number) => {
        setActiveThumbnailIndex(index + 1);
    };

    const handleModalNext = (index: number, len: number) => {
        if (index === -1 || index === len - 1) {
            if (activeThumbnailIndex === thumbnails.length) {
                handleModalClose();
                setCurrentIndexStory(0);
            }
            else {
                setActiveThumbnailIndex(activeThumbnailIndex + 1);
                setCurrentIndexStory(0);
            }
        }
        else {
            setCurrentIndexStory(index + 1);
        }
    };

    const handleModalPrev = (index: number, len: number) => {
        if (index === -1 || index == 0) {
            if (activeThumbnailIndex === 1) {
                handleModalClose();
                setCurrentIndexStory(0);
            }
            else {
                setActiveThumbnailIndex(activeThumbnailIndex - 1);
                setCurrentIndexStory(0);
            }
        }
        else {
            setCurrentIndexStory(index - 1);
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
                <>
                    <Story stories={stories.filter((store) => store.stories_group_id === activeThumbnailIndex)}
                        handleCloseClick={handleModalClose}
                        handleModalNext={handleModalNext}
                        handleModalPrev={handleModalPrev}
                        group_index={activeThumbnailIndex}
                        curIndex={currentIndexStory}
                        setCurrentIndex={setCurrentIndexStory}
                    />
                </>
            )}
        </div>
    )
}

export default Stories;

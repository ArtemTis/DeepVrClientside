import { useEffect, useMemo, useState } from "react";

import StoryThumbnail from "./StoryThumbnail";
import Story from "./Story";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { selectStories, selectThumbnails, selectThumbnailLoadingStatus, selectStoryLoadingStatus } from "../store/selectors";
import { getAllStories, getAllThumbnails } from "../store/asyncActions";
import { LoadWrapper } from "../../../Components/Common/Markup/LoadWrapper";

import "./thumbnailStyles.css";
import "./storyStyles.css"


const Stories = () => {

    const dispatch = useAppDispatch();
    const stories = useAppSelector(selectStories);
    const thumbnails = useAppSelector(selectThumbnails);
    const thumbnailsLoadingStatus = useAppSelector(selectThumbnailLoadingStatus);
    const storiesLoadingStatus = useAppSelector(selectStoryLoadingStatus);

    const viewedThumbnails: number[] = JSON.parse(localStorage.getItem('viewedThumbnails') || '[]');

    useEffect(() => {
        dispatch(getAllStories());
        dispatch(getAllThumbnails());
    }, []);


    const [activeThumbnailId, setActiveThumbnailId] = useState(-1);
    const [currentIndexStory, setCurrentIndexStory] = useState(0);


    const currentThumbnailId = useMemo(() => 
        thumbnails.findIndex((thumbnail) => thumbnail.id == activeThumbnailId),
    [activeThumbnailId, thumbnails]);

    function setThumbnailId() {
        if (!viewedThumbnails.includes(activeThumbnailId)) {
            const newViewed = [...viewedThumbnails, activeThumbnailId];
            localStorage.setItem('viewedThumbnails', JSON.stringify(newViewed));
        }
    }

    const handleModalOpen = (index: number) => {
        setActiveThumbnailId(thumbnails[index].id);
    };

    const handleModalNext = (index: number, len: number) => {

        if (index === -1 || index === len - 1) {
            if (currentThumbnailId === thumbnails.length - 1) {
                setThumbnailId();
                handleModalClose();
            }
            else {
                setThumbnailId();
                setActiveThumbnailId(thumbnails[currentThumbnailId + 1].id);
                setCurrentIndexStory(0);
            }
        }
        else {
            setCurrentIndexStory(index + 1);
        }
    };

    const handleModalPrev = (index: number, len: number) => {
        if (index === -1 || index == 0) {
            if (activeThumbnailId === 1) {
                handleModalClose();
            }
            else {
                setActiveThumbnailId(thumbnails[currentThumbnailId - 1].id);
                setCurrentIndexStory(0);
            }
        }
        else {
            setCurrentIndexStory(index - 1);
        }
    };

    const handleModalClose = () => {
        setActiveThumbnailId(-1);
        setCurrentIndexStory(0);
    }

    return (
        <div className="stories">
            {thumbnailsLoadingStatus === "never" ? <div>Never...</div> : null}
            {thumbnailsLoadingStatus === "loading" ?
                Array.from({ length: 3 }, (_, index) =>
                    <div key={index} className="thumbnailLoading">
                        <LoadWrapper isLoading={true} height={1} />
                    </div>
                )
                : null}
            {thumbnailsLoadingStatus === "error" ? <div>Error loading story's thumbnail.</div> : null}
            {thumbnailsLoadingStatus === "successfull" ? thumbnails.map((thumbnail, index) => (
                <StoryThumbnail
                    key={thumbnail.id}
                    setActiveStory={handleModalOpen}
                    thumbnail={thumbnail}
                    index={index}
                />
            )) : null}


            {activeThumbnailId !== -1 && (
                <>
                    {storiesLoadingStatus === "never" ? <div>Never...</div> : null}
                    {storiesLoadingStatus === "loading"
                        ? <div className="stories-container">
                            <div className="close-icon" onClick={handleModalClose}>
                                &#x2715;
                            </div>
                            <LoadWrapper isLoading={true} height={1} />
                        </div>
                        : null}
                    {storiesLoadingStatus === "error" ? <div>Error loading stories.</div> : null}
                    {storiesLoadingStatus === "successfull"
                        ? <Story stories={stories.filter((store) => store.stories_group_id === activeThumbnailId)}
                            handleCloseClick={handleModalClose}
                            handleModalNext={handleModalNext}
                            handleModalPrev={handleModalPrev}
                            group_index={activeThumbnailId}
                            curIndex={currentIndexStory}
                            setCurrentIndex={setCurrentIndexStory}
                        />
                        : null}
                </>
            )}
        </div>
    )
}

export default Stories;

import { Location, useNavigate, useParams } from "react-router";

import { useAppDispatch, useAppSelector } from "../../../app/store";
import { selectIds, selectStoriesById, selectIsThumbnailLoaded } from "../store/selectors";
import { LoadWrapper } from "../../../Components/Common/Markup/LoadWrapper";
import { useEffect, useMemo, useState } from "react";
import { getGroupStoriesById } from "../store/asyncActions";
import { setViewed } from "../store/slice";
import { STORIES_PATH } from "../../../Utils/routeConstants";
import ViewStory from "./StoryView";

const Story = (props: {location: Location}) => {
    const location = props.location;

    const [currentIndexStory, setCurrentIndexStory] = useState(0);
    const navigate = useNavigate();

    const { id } = useParams();
    const currentThumbnailId = Number(id);

    const dispatch = useAppDispatch();

    const thumbnailsIds = useAppSelector(selectIds);
    const isThumbnailLoaded = useAppSelector(state => selectIsThumbnailLoaded(state, currentThumbnailId));

    const stories = useAppSelector(state => selectStoriesById(state, currentThumbnailId));
    

    useEffect(() => {
        if (!isThumbnailLoaded) {
            dispatch(getGroupStoriesById(currentThumbnailId));
        }
    }, [currentThumbnailId, isThumbnailLoaded]);

    const currentThumbnailIndex = useMemo(() =>
        thumbnailsIds.findIndex((thumbnail: number) => thumbnail == currentThumbnailId),
    [currentThumbnailId, thumbnailsIds]);

    const handleModalNext = (index: number, len: number) => {
        if (index === -1 || index === len - 1) {
            if (currentThumbnailIndex === thumbnailsIds.length - 1) {
                dispatch(setViewed(currentThumbnailId));
                handleModalClose();
            }
            else {
                dispatch(setViewed(currentThumbnailId));
                setCurrentIndexStory(0);
                navigate(`${STORIES_PATH}/${thumbnailsIds[currentThumbnailIndex + 1]}`, {state: { previousLocation: location }});
            }
        }
        else {
            setCurrentIndexStory(index + 1);
        }
    };

    const handleModalPrev = (index: number) => {
        if (index === -1 || index == 0) {
            if (currentThumbnailIndex === 0) {
                handleModalClose();
            }
            else {
                setCurrentIndexStory(0);
                navigate(`${STORIES_PATH}/${thumbnailsIds[currentThumbnailIndex - 1]}`, {state: { previousLocation: location }});
            }
        }
        else {
            setCurrentIndexStory(index - 1);
        }
    };

    const handleModalClose = () => {
        setCurrentIndexStory(0);
        navigate('/', {replace: true});
    }

    return (
        <>
            {stories.length == 0
                ? <div className="stories-container">
                    <div className="close-icon" onClick={handleModalClose}>
                        &#x2715;
                    </div>
                    <LoadWrapper isLoading={true} height={1} />
                </div>
                :  <ViewStory stories={stories}
                    handleCloseClick={handleModalClose}
                    handleModalNext={handleModalNext}
                    handleModalPrev={handleModalPrev}
                    group_index={currentThumbnailId}
                    curIndex={currentIndexStory}
                    setCurrentIndex={setCurrentIndexStory}
                />}
        </>
    )
}

export default Story;

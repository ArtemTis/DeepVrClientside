import { useEffect } from "react";

import StoryThumbnail from "./StoryThumbnail";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { selectThumbnails, selectThumbnailLoadingStatus, selectTextError } from "../store/selectors";
import { getAllThumbnails, getGroupStoriesById } from "../store/asyncActions";
import { LoadWrapper } from "../../../Components/Common/Markup/LoadWrapper";

import "./thumbnailStyles.css";
import "./storyStyles.css"
import { Link } from "react-router-dom";
import { STORIES_PATH } from "../../../Utils/routeConstants";

const Stories = () => {

    // const {thumbnails, stories} = useLoaderData();

    const dispatch = useAppDispatch();

    const thumbnails = useAppSelector(selectThumbnails);
    const thumbnailsLoadingStatus = useAppSelector(selectThumbnailLoadingStatus);
    const errorText = useAppSelector(selectTextError);

    useEffect(() => {
        dispatch(getAllThumbnails());
    }, []);

    return (
        <div className="stories">
            {thumbnails.length == 0
                ? Array.from({ length: 3 }, (_, index) =>
                    <div key={index} className="thumbnailLoading">
                        <LoadWrapper isLoading={true} height={1} />
                    </div>
                )
                : thumbnails.map((thumbnail, index) =>
                    <Link to={`${STORIES_PATH}/${thumbnail.id}`} key={thumbnail.id}>
                        <StoryThumbnail
                            thumbnail={thumbnail}
                        />
                    </Link>
                )
            }
        </div>
    )
}

export default Stories;

// const thumbnailsLoader = async () => {
//     return defer({
//         thumbnails: getAllThumbnails(),
//         stories: getAllStories()
//     })
// }

{/* <Link to={`${STORIES_PATH}/${thumbnail.id}`} key={thumbnail.id} state={{modal: true}}>
                        <StoryThumbnail
                            thumbnail={thumbnail}
                        />
                    </Link> */}
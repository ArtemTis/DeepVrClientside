import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Thumbnail from "./ThumbnailView";
import { useAppDispatch, useAppSelector } from "../../../app/store";
import { selectThumbnailLoadingStatus, selectThumbnails } from "../store/selectors";
import { getAllThumbnails } from "../store/asyncActions";
import emptyThumbnailImage from "../../../assets/emptyThumbnails.png"

import "./thumbnailStyles.css";
import "./storyStyles.css"
import "./media.css"
import { ReqStatus } from "../../../lib/utils/enums";
import { LoadWrapper } from "../../../lib/ui/LoadWrapper";
import { STORIES_PATH } from "../../../lib/utils/routeConstants";

const ThumbnailsContainer = () => {

    const dispatch = useAppDispatch();

    const thumbnails = useAppSelector(selectThumbnails);
    const thumbnailLoadingStatus = useAppSelector(selectThumbnailLoadingStatus)
    const location = useLocation();

    useEffect(() => {
        if (thumbnails.length == 0) dispatch(getAllThumbnails());
    }, []);

    return (
        <div className="stories">
            {(thumbnailLoadingStatus === ReqStatus.rejected || (thumbnailLoadingStatus === ReqStatus.fulfield && thumbnails.length == 0))
                ? <EmptyThumbnail />
                : null}
            {thumbnailLoadingStatus === ReqStatus.pending || thumbnailLoadingStatus === ReqStatus.never
                ? Array.from({ length: 3 }, (_, index) =>
                    <div key={index} className="thumbnailLoading">
                        <LoadWrapper isLoading={true} height={1} />
                    </div>
                )
                : thumbnails.map((thumbnail) =>
                    <Link to={`${STORIES_PATH}/${thumbnail.id}`} key={thumbnail.id} state={{ previousLocation: location }}>
                        <Thumbnail
                            thumbnail={thumbnail}
                        />
                    </Link>
                )
            }
        </div>
    )
}

const EmptyThumbnail = () => {
    return (
        <button className="emptyThumbnail">
            <img src={emptyThumbnailImage} />
            <span>Здесь скоро будут истории</span>
        </button>
    )
}

export default ThumbnailsContainer;

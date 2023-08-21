import { useEffect } from "react";

import Thumbnail from "./ThumbnailView";
import { useAppDispatch, useAppSelector } from "../../../Utils/redux/store";
import { selectIsThumbnailLoaded, selectThumbnailLoadingStatus, selectThumbnails } from "../store/selectors";
import { getAllThumbnails } from "../store/asyncActions";
import { LoadWrapper } from "../../../Components/Common/Markup/LoadWrapper";

import "./thumbnailStyles.css";
import "./storyStyles.css"
import "./media.css"

import { Link, useLocation } from "react-router-dom";
import { STORIES_PATH } from "../../../Utils/routeConstants";
import { ReqStatus } from "../../../Utils/enums";

const ThumbnailsContainer = () => {

    const dispatch = useAppDispatch();

    const thumbnails = useAppSelector(selectThumbnails);
    const thumbnailLoadingStatus = useAppSelector(selectThumbnailLoadingStatus)
    const location = useLocation();

    useEffect(() => {
        if(thumbnails.length == 0) dispatch(getAllThumbnails());
    }, []);

    return (
        <div className="stories">


            {/* {(thumbnailLoadingStatus === ReqStatus.rejected || thumbnails.length == 0) } */}
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

export default ThumbnailsContainer;

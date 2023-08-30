import { IThumbnail } from "../data/storiesDto";

const Thumbnail = (props: {thumbnail: IThumbnail}) => {
    const { thumbnail } = props;

    const thumbnailContentClassname = thumbnail.isViewed ? "viewed" : "notViewed";

    return (
        <button className="thumbnail">
            <img className={thumbnailContentClassname} src={thumbnail.content} />
            <span>{thumbnail.title}</span>
        </button>
    )
};

export default Thumbnail;

import "./thumbnailStyles.css"
import { IThumbnail } from "../data/storiesDto";

interface props {
    thumbnail: IThumbnail,
}

const StoryThumbnail = (prop: props) => {
    const { thumbnail } = prop;

    let isViewed = "notViewed";
    const viewedThumbnails: number[] = JSON.parse(localStorage.getItem('viewedThumbnails') || '[]');

    viewedThumbnails.map(id => {
        if (thumbnail.id === id) {
            isViewed = "viewed";
            return;
        }
    })

    return (
        <button className="thumbnail">
            <img className={isViewed} src={thumbnail.content} />
            <span>{thumbnail.title}</span>
        </button>
    )
};

export default StoryThumbnail;

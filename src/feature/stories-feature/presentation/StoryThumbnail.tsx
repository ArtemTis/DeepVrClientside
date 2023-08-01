import "./thumbnailStyles.css"
import IThumbnail from "../data/thumbnailDto";

interface props {
    index: number,
    setActiveStory: (index: number) => void,
    thumbnail: IThumbnail
}

const StoryThumbnail = (prop: props) => {
    const { index, setActiveStory, thumbnail } = prop;
    return (
        <button className="thumbnail" onClick={() => setActiveStory(index)}>
            <img src={thumbnail.content}/>
            <span>{thumbnail.title}</span>
        </button>
    )
};

export default StoryThumbnail;

import "./thumbnailStyles.css"
import IThumbnail from "../data/thumbnailDto";

interface props {
    index: number,
    setActiveStory: (index: number) => void,
    thumbnail: IThumbnail
}

const StoryThumbnail = (prop: props) => {
    const { index, setActiveStory, thumbnail } = prop;
    
    let isViewed = "notViewed";
    const viewedThumbnails: number[] = JSON.parse(localStorage.getItem('viewedThumbnails') || '[]');

    viewedThumbnails.map(id => {
        if(thumbnail.id === id) {
            isViewed = "viewed";
            return;
        }
    })

    return (
        <button className="thumbnail" onClick={() => setActiveStory(index)}>
            <img className={isViewed} src={thumbnail.content}/>
            <span>{thumbnail.title}</span>
        </button>
    )
};

export default StoryThumbnail;

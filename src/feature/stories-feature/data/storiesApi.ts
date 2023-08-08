import IStories from "./storiesDto";
import IThumbnail from "./thumbnailDto";

import storiesData from "./stories";
import thumbnailsData from "./thumbnails";

const api = {
  getStories: () => {
    return new Promise<IStories[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(storiesData);
      }, 5000)
    });
  },
  getThumbnails: () => {
    return new Promise<IThumbnail[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(thumbnailsData);
      }, 3000)
    });
  },
}

export default api;
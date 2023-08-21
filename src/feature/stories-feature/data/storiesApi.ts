import {IStoriesRequest, IThumbnailDto, stories1, stories2, stories3, thumbnails} from "./storiesDto";

const api = {
  getStories: () => {
    return new Promise<IThumbnailDto[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(thumbnails);
      }, 2000)
    });
  },
  getThumbnails: (id: number) => {
    return new Promise<IStoriesRequest[]>((resolve, reject) => {
      setTimeout(() => {
        if(id === 1) resolve(stories1);
        if(id === 2) resolve(stories2);
        if(id === 3) resolve(stories3);
      }, 2000)
    });
  }
}

export default api;

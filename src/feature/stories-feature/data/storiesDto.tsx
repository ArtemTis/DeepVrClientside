export interface IThumbnail {
    id: number,
    title: string,
    content: string,
    isViewed?: boolean,
    stories?: IStories[]
}

export interface IStories {
    id: number,
    type: string,
    duration: number,
    url: string,
    stories_group_id: number
}

export interface IThumbnailDto {
    id: number,
    title: string,
    logo: string,
    active: boolean,
    isViewed?: boolean,
    stories: IStoriesRequest[]
}

export interface IStoriesRequest {
    id: number,
    title: string,
    content: string,
    active: true,
    storiesGroupId: number
}
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

export const thumbnails: IThumbnailDto[] = [
    {
        id: 1,
        title: "test1",
        logo: "https://i.pinimg.com/736x/ed/cf/53/edcf53ef1a57fa8a1fab45a177e918a5.jpg",
        active: true,
        stories: []
    },
    {
        id: 2,
        title: "test2",
        logo: "https://i.pinimg.com/736x/ed/cf/53/edcf53ef1a57fa8a1fab45a177e918a5.jpg",
        active: true,
        stories: []
    },
];

export const stories1: IStoriesRequest[] = [
    {
        id: 5,
        title: "",
        content: "https://i.pinimg.com/736x/ed/cf/53/edcf53ef1a57fa8a1fab45a177e918a5.jpg",
        active: true,
        storiesGroupId: 1
    },
    {
        id: 8,
        title: "",
        content: "https://i.pinimg.com/736x/ed/cf/53/edcf53ef1a57fa8a1fab45a177e918a5.jpg",
        active: true,
        storiesGroupId: 1
    },
    {
        id: 9,
        title: "",
        content: "https://i.pinimg.com/736x/ed/cf/53/edcf53ef1a57fa8a1fab45a177e918a5.jpg",
        active: true,
        storiesGroupId: 1
    },
]

export const stories2: IStoriesRequest[] = [
    {
        id: 3,
        title: "",
        content: "https://i.pinimg.com/736x/ed/cf/53/edcf53ef1a57fa8a1fab45a177e918a5.jpg",
        active: true,
        storiesGroupId: 2
    },
    {
        id: 6,
        title: "",
        content: "https://i.pinimg.com/736x/ed/cf/53/edcf53ef1a57fa8a1fab45a177e918a5.jpg",
        active: true,
        storiesGroupId: 2
    },
]

export const stories3: IStoriesRequest[] = [
    {
        id: 3,
        title: "",
        content: "https://i.pinimg.com/736x/ed/cf/53/edcf53ef1a57fa8a1fab45a177e918a5.jpg",
        active: true,
        storiesGroupId: 3
    },
    {
        id: 6,
        title: "",
        content: "https://i.pinimg.com/736x/ed/cf/53/edcf53ef1a57fa8a1fab45a177e918a5.jpg",
        active: true,
        storiesGroupId: 3
    },
]
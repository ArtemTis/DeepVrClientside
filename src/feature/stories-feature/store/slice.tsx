import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import { getAllThumbnails, getGroupStoriesById } from "./asyncActions";
import { IThumbnail, IStoriesRequest, IThumbnailDto } from "../data/storiesDto";
import { ReqStatus } from "../../../Utils/enums";

export const storiesAdapter = createEntityAdapter<IThumbnail>({selectId: (t) => t.id});

const initialState = storiesAdapter.getInitialState({
    allThumbnailLoadingStatus: ReqStatus.never,
    allThumbnailErrorText: "",
    statusStoriesByThumbnailId: ReqStatus.never,
})


const slice = createSlice({
    name: "storySlice",
    initialState,
    reducers: {
        setViewed: (state, action) => {
            const viewedThumbnails: number[] = JSON.parse(localStorage.getItem('viewedThumbnails') || '[]');
            if (!viewedThumbnails.includes(action.payload)) {
                const newViewed = [...viewedThumbnails, action.payload];
                localStorage.setItem('viewedThumbnails', JSON.stringify(newViewed));
                const thumbnail = storiesAdapter.getSelectors().selectById(state, action.payload);
                if (thumbnail == undefined) return;
                storiesAdapter.setOne(state, { ...thumbnail, isViewed: true });
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(getAllThumbnails.pending, (state, action) => {
            state.allThumbnailLoadingStatus = ReqStatus.pending;
        }),
            builder.addCase(getAllThumbnails.fulfilled, (state, action) => {
                state.allThumbnailLoadingStatus = ReqStatus.fulfield;
                storiesAdapter.setAll(state, filteredThumbnails(action.payload));
            }),
            builder.addCase(getAllThumbnails.rejected, (state, action) => {
                state.allThumbnailLoadingStatus = ReqStatus.rejected;
                state.allThumbnailErrorText = action.error.message ?? 'текст ошибки';
            }),
            builder.addCase(getGroupStoriesById.pending, (state) => {
                state.statusStoriesByThumbnailId = ReqStatus.pending;
            }),
            builder.addCase(getGroupStoriesById.fulfilled, (state, action) => {
                state.statusStoriesByThumbnailId = ReqStatus.fulfield;

                const thumbnailId = action.meta.arg;
                const thumbnail = storiesAdapter.getSelectors().selectById(state, thumbnailId);
                if (thumbnail == undefined) return;
                storiesAdapter.setOne(state, { ...thumbnail, stories: filteredStories(action.payload) });
            }),
            builder.addCase(getGroupStoriesById.rejected, (state, action) => {
                state.statusStoriesByThumbnailId = ReqStatus.rejected;
                state.allThumbnailErrorText = action.error.message ?? 'текст ошибки';
            })
    },
})

export const storiesReducer = slice.reducer;
export const { setViewed } = slice.actions;


const filteredThumbnails = (state: IThumbnailDto[]) => {
    const thumbnails: IThumbnail[] = state.map((item) => {
        return {
            id: item.id,
            title: item.title,
            content: item.logo
        }
    })
    const viewedThumbnails: number[] = JSON.parse(localStorage.getItem('viewedThumbnails') || '[]');

    const thumbnailsId = thumbnails.map(elem => elem.id);
    const updatedViewedThumbnails = viewedThumbnails.filter(id => thumbnailsId.includes(id));
    localStorage.setItem('viewedThumbnails', JSON.stringify(updatedViewedThumbnails));

    const readyThumbnails: IThumbnail[] = thumbnails.map(elem => {
        const updatedThumbnail = { ...elem };

        if (updatedViewedThumbnails.includes(elem.id)) updatedThumbnail.isViewed = true;
        else updatedThumbnail.isViewed = false;

        return updatedThumbnail;
    });

    
    readyThumbnails.sort((a, b) => {
            if (a.isViewed && !b.isViewed) {
                return 1;
            } else if (!a.isViewed && b.isViewed) {
                return -1;
            } else {
                return a.id - b.id;
            }
        }
    )
    

    return readyThumbnails;
}


const filteredStories = (state: IStoriesRequest[]) => {
    const arr = state.filter((story) => story.content !== null)

    let readyStories = arr.map(story => {
        return {
            id: story.id,
            type: story.content.includes("mp4") ? "video" : "image",
            duration: 10000,
            url: story.content,
            stories_group_id: story.storiesGroupId
        }
    })

    return readyStories;
}

import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {useAppSelector} from "../../utils/hooks/useAppSelector.ts";
import {ListType} from "../../api/list.ts";

export interface ListState {
    favorite: number[]
    listArray: ListType[]
}

const initialState: ListState = {
    favorite: [],
    listArray: []
}

export const listSlice = createSlice({
    name: 'list',
    initialState,
    reducers: {
        setFavorite: (state, { payload }: PayloadAction<number[]>) => {
            state.favorite = payload
        },
        setListArray: (state, { payload }: PayloadAction<ListType[]>) => {
            state.listArray = payload
        },
    },
})

export const { setFavorite, setListArray } = listSlice.actions

export const useFavorite = () => useAppSelector((store) => store.list.favorite)

export const useListArray = () => useAppSelector((store) => store.list.listArray)

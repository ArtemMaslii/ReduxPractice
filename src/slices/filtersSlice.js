import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../hooks/http.hook";

const initialState = {
    filters: [],
    filtersLoadingStatus: "idle",
    activeFilter: "all"
}

export const fetchedFilters = createAsyncThunk(
    "filters/fetchedFilters",
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/filters");
    }
)

const filtersSlice = createSlice({
    name: "filters",
    initialState: initialState,
    reducers: {
        activeFilterChanged: (state, action) => {
            state.activeFilter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchedFilters.pending, state => {state.filtersLoadingStatus = "loading"})
            .addCase(fetchedFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = "idle";
                state.filters = action.payload;
            })
            .addCase(fetchedFilters.rejected, state => {state.filtersLoadingStatus = "error";})
            .addDefaultCase(() => {});
    }
});

const {actions, reducer} = filtersSlice;

export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged
} = actions;
import { createAction } from "@reduxjs/toolkit"

export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

export const heroesFetching = createAction("HEROES_FETCHING");

export const filtersFetching = () => {
    return {
        type: "FILTERS_FETCHING"
    }
}

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

export const heroesFetched = createAction("HEROES_FETCHED");

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

export const heroesFetchingError = createAction("HEROES_FETCHING_ERROR");

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const activeFilterChanged = (filter) => {
    return {
        type: "ACTIVE_FILTER_CHANGED",
        payload: filter
    }
}

// export const heroDeleted = (id) => {
//     return {
//         type: "HERO_DELETED",
//         payload: id
//     }
// }

export const heroDeleted = createAction("HERO_DELETED");

// export const heroAdded = (newHero) => {
//     return {
//         type: "HERO_ADDED",
//         payload: newHero
//     }
// }

export const heroAdded = createAction("HERO_ADDED");
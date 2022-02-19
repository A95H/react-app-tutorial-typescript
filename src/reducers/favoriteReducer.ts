export function FavoriteReducer(state: FavoriteStateIF = { numberOfFavorites: 0 }, action: { type: String }) {
    switch (action.type) {
        case 'ADD_TO_FAVORITE':
            return {
                ...state,
                numberOfFavorites: state.numberOfFavorites + 1,
            };
        case 'REMOVE_FROM_FAVORITE':
            return {
                ...state,
                numberOfFavorites: state.numberOfFavorites - 1,
            };
        default:
            return state;
    }
}

export interface FavoriteStateIF {
    numberOfFavorites: number;
}

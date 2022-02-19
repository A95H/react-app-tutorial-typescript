import { combineReducers } from 'redux';
import { FavoriteReducer, FavoriteStateIF } from './favoriteReducer';

export default combineReducers({ favoriteReducer: FavoriteReducer });

export interface AppState {
    favoriteReducer: FavoriteStateIF;
}

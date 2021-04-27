import {FETCH_LOCATIONS, GET_CATEGORIES} from '../constants'

export const locationsList = (state = {}, action) => {
	switch (action.type) {
		case FETCH_LOCATIONS: {
			return {
				locations: action.locations
			};
		}

		case GET_CATEGORIES: {
			return {
				...state,
				categories: action.categories
			};
		}

		default:
			return state;
	}
};
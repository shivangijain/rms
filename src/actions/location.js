import {FETCH_LOCATIONS, GET_CATEGORIES, BASE_URL} from '../constants';

export const fetchLocations = () => (dispatch) => {
	fetch(`${BASE_URL}/data.json`
		,{
			headers : { 
					'Content-Type': 'application/json',
					'Accept': 'application/json'
			}
		}
	)
	.then(function(response){
		return response.json();
	})
	.then(function(myJson) {
		return dispatch({
			type: FETCH_LOCATIONS,
			locations: myJson.data.locations
		})
	});
}

export const getCategories = (locationName, branchName) => (dispatch, getState) => {
	let categories = [];
	const locations = getState().locationsList.locations;
	const location = locations && locations.filter(location => location.name.toLowerCase() === locationName)[0]
	if(branchName){
		const branch = location && location.branches.filter(branch => branch.name.toLowerCase() ===  branchName)[0]
		categories = branch ? branch.categories : [];
	}else{
		location && location.branches.forEach(branch => 
			categories.push(branch.categories)
		)
	}
	if(categories){
		return dispatch({
			type: GET_CATEGORIES,
			categories: categories.flat()
		})
	}
}	


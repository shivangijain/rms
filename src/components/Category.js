import React, {Component} from 'react';
import { connect }    from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { getCategories } from '../actions';
import BreadcrumbsLink from './BreadcrumbsLink';
import List from './List';
import { locationFromUrl } from '../util';

class Category extends Component {
	state = {
		flag: false,
		category: null,
		location: null,
		branch: null
	}

	componentDidMount(){
		const {location, branch} = locationFromUrl();
		this.setState({location, branch})
		this.props.getCategories(location, branch);
	}

	componentDidUpdate(prevProps){
		const {location, branch} = locationFromUrl();
		if(prevProps.location.pathname !== this.props.location.pathname ){
			this.setState({location, branch, flag: false, category: null})
			this.props.getCategories(location, branch);
		}
	}

	handleCategory = (category) => {
		this.setState({flag: true, category})
	}

	handleLinkClick = () => {
		this.setState({flag: false, category: null})
	}

	render(){
		const { category, flag} = this.state;
		const { categories } = this.props;

		return(
			<div>
				<BreadcrumbsLink data={this.state} handleLinkClick={() => this.handleLinkClick()}/>
				<Grid container spacing={3}>
					{!flag && categories && 
						<List 
							lists={categories}
							type='category'
							handleCategory={(item) => this.handleCategory(item)}
						/>
					}
					{flag && category.subcategories &&
						<List 
							lists={category.subcategories} 
							type='category/subcategory' 
						/>
					}
				</Grid>
			</div>    
		)
	}
}

const mapStateToProps = state => {
  return { categories: state.locationsList.categories }
}

const mapDispatchToProps = dispatch => {
  return {
    getCategories: (location, branch) => dispatch(getCategories(location, branch))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
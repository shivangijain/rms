import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect }    from 'react-redux';
import Header from './components/Header';
import Landing from './components/Landing';
import Category from './components/Category';
import { fetchLocations }  from './actions';
// import './App.css'
class App extends React.Component {

  componentDidMount() {
		this.props.fetchLocations();
	}

  render() {
    if(!this.props.locations) return <div>Loading...</div>
    return (
      <div className="container">
        <BrowserRouter>
          <Header locations={this.props.locations} />
					<Route exact path='/' component={Landing}/>
					<Route path='/:location' component={Category}/>
				</BrowserRouter>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchLocations: () => dispatch(fetchLocations())
  }
}

const mapStateToProps = state => {
  return { locations: state.locationsList.locations }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

// JavaScript source code
import React, { Component } from 'react';
import './TopNavBar.css';
import { setSearchData, getSearchData,setSearchingState } from '../../ReduxStore/ActionCreators/Actions';
import { connect } from 'react-redux';




class TopNavBar extends Component {


    onSearchChangeHandler = (event) => {
        //console.log(event.target.value);
        this.props.setSearchString(event.target.value);
    }

    onSearchClick = () => {
        if (this.props.searchString.length > 2)
            this.props.getSearchedData(this.props.searchString);
        else
            alert('Search String must be atleast 3 characters in length or use Back button to return to main page');
    }

    onBackClick = () => {
        this.props.backButtonClicked();
    }

    render() {
        return (
            <div className="TopNavBar" >

                <img src={"./Assets/NavBar/Back.png"} className="Nav_back_img" alt="Nav_back_img" onClick={this.onBackClick} />
                <h3 className="Nav_item1">{this.props.title}</h3>
                <input className="Nav_search" placeholder="Search" onChange={this.onSearchChangeHandler} />
                <img src={"./Assets/NavBar/search.png"} className="Nav_item" onClick={this.onSearchClick} alt="search" />

            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        searchString: state.searchString,
        title: state.Title
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchString: (data) => dispatch(setSearchData(data)),
        getSearchedData: (data) => dispatch(getSearchData(data)),
        backButtonClicked: () => dispatch(setSearchingState())
    }
}

 

export default connect(mapStateToProps, mapDispatchToProps)(TopNavBar);
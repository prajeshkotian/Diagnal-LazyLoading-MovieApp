// JavaScript source code
import React, { Component, lazy, Suspense} from 'react';
import { getData } from '../../ReduxStore/ActionCreators/Actions';
import { connect } from 'react-redux';
import PlaceHolder from '../../Components/Post/PlaceHolder';
import './MainPage.css';
import LoaderSpinner from '../../Helper/LoaderSpinner';

let prevPage;

class MainPage extends Component {

    post_tracker = 0;

    componentDidMount() {

        //make API Call to get First Page Data
        this.props.getPageData(this.props.pageNo);
        window.addEventListener('scroll', this.onScrollHandler);
    }


    onScrollHandler = (event) => {
        //console.log("document-height", document.documentElement.offsetHeight);
        const { innerHeight, scrollY } = event.currentTarget;
        

        if ((document.documentElement.offsetHeight - scrollY) < (innerHeight + 300) && (this.props.pageNo < 3) && (this.props.loading === false) && (prevPage !== this.props.pageNo)) {
            console.log('Loading Next Page number ' + (this.props.pageNo + 1));
            prevPage = this.props.pageNo;
            this.props.getPageData(this.props.pageNo+1);
        }
        
    }

    //method to load posts to listing page either searched data or data retrievedfrom API call 
    loadPosts = (array) => {
        //if (array.length > 0) {

            const posts = array.map(ele => {
                //post_tracker variable to get unique id for each post
                this.post_tracker++;

                //lazily load the Post component
                const Post = React.lazy(() => import('../../Components/Post/Post'));
                return (


                    <Suspense fallback={<PlaceHolder />} key={this.post_tracker}>
                        <Post title={ele.name} img={ele['poster-image']}  />
                    </Suspense>
                );
            })
            return posts;
        

        ////check if no data is present
        //else {
        //    return <h4 style={{ textAlign:"center" }}>No Data Found!!</h4>
        //}
        
    }

    render() {
        
        //stores the posts to be displayed in listing page
        const posts = this.props.searching === false ? this.loadPosts(this.props.Posts) : this.loadPosts(this.props.searchedData)

        return (
            <div>
                
                <div className="MainPage">
                    
                    {posts.length>0 ? posts:<p>No Data!!</p>}
                    <LoaderSpinner />
                </div>
            </div>
            );
    }
}

const mapStateToProps = (state) => {
    return {
        pageNo: state.pageNo,
        Posts: state.Posts,
        searching: state.searching,
        searchedData: state.searchedData,
        loading: state.loading,
        
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        getPageData: (pageno) => dispatch(getData(pageno))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
// JavaScript source code

const initialState = {
    pageNo: 1,
    Title:'',
    Posts: [],
    error: '',
    loading: false,
    searchString: '',
    searchedData: [],
    searching: false
};

function MainReducer(state=initialState,action) {
    switch (action.type) {
        //loading data page wise 
        case 'GET_DATA':
            {

               
                return {
                    ...state,
                    //loading: true
                    
                }
                
            }
        case 'GET_DATA_SUCCESS':
            {

                //console.log(parseInt(action.value.page['page-num-requested'],10));
                return {
                    ...state,
                    //converting page number toint to keeprack of which page is called
                    pageNo: parseInt(action.value.page['page-num-requested'], 10),
                    Title: action.value.page.title,
                    Posts: state.Posts.concat(action.value.page['content-items'].content),
                    //loading: true
                }

            }

            //if API call fails we log error data
        case 'GET_DATA_FAILURE':
            {
                console.log(action.value);
                return {
                    ...state,
                    Title: null,
                    Posts: null,
                    error: action.value
                }
                
            }

            //setting the search string into the store
        case 'SET_SEARCH_DATA':
            {
                //console.log(action.value);
                return {
                    ...state,
                    searchString:action.value
                }

            }

            //retrieve searched data from the store
        case 'GET_SEARCH_DATA':
            {
                //console.log(action.value);
                let searchString = state.searchString;
                const searcheddata = state.Posts.filter(ele => {
                    if (ele.name.toLowerCase().includes(searchString.toLowerCase())) {
                        return ele;
                    }
                    else
                        return null;
                })
                console.log(searcheddata);

                return {
                    ...state,
                    searching: true,
                    searchedData: searcheddata
                }

            }

            //set the searching state back to false when backbutton is pressed 
        case 'SET_SEARCHING_STATE':
            {
                //console.log(action.value);
                return {
                    ...state,
                    searching: false
                }

            }
        default:
            return state;
    }


}

export default MainReducer;
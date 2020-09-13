// JavaScript source code
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';

export const getData = (pageno) => {
   
    return (dispatch) => {
        trackPromise(axios.get('https://diagnal-api.herokuapp.com/pages/page' + pageno)
            .then(res => {
                //console.log(res);
                dispatch(getDataCall());
                dispatch(getDataSuccess(res.data));
            })
            .catch(err => {
                dispatch(getDataFailure(err));
            }));
    }
}

const getDataSuccess = (data) => {
    //console.log(data);
    return{
        type: 'GET_DATA_SUCCESS',
        value: data
    }
}

const getDataCall = () => {
    return {
        type: 'GET_DATA'
    }
}

const getDataFailure = (err) => {
    return {
        type: 'GET_DATA_FAILURE',
        value: err
    }
}


export const setSearchData = (data) => {
    return {
        type: 'SET_SEARCH_DATA',
        value: data
    }
}

export const getSearchData = (data) => {
    return {
        type: 'GET_SEARCH_DATA',
        value: data
    }
}

export const setSearchingState = () => {
    return {
        type: 'SET_SEARCHING_STATE',
    }
}
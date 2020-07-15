import React from 'react'
import axios from 'axios'

const reqDeviceList = () => {
    // axios.get('/device/*');

    // const port = 55001;
    // axios.defaults.baseURL = window.location.protocol + '//' + window.location.hostname + ':' + port;
    // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    // axios.defaults.headers.common['Access-Control-Allow-Methods'] = 'GET,PUT,POST,DELETE,PATCH,OPTIONS';
    // axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'


    try {
        return axios.get('/device/*');
    } catch (error) {
        console.log("으아아악");
        console.log(error);
        console.log("으아아악");

    }
}

function useDeviceList() {
    const list = reqDeviceList()
        .then(response => {
            console.log(response);
        })

}

export default useDeviceList

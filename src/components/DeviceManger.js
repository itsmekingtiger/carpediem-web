import React from 'react'
import axios from 'axios'

function DeviceManger() {

    try {
        axios.get('/device/*')
            .then((res) => {
                console.log(res.data);
            })
    } catch (error) {
        console.log("으아아악");
        console.log(error);
        console.log("으아아악");

    }
    return (
        <div>

        </div>
    )
}

export default DeviceManger

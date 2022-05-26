import Axios from 'axios';
import React, { useEffect, useState } from 'react'

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState([])

    useEffect(() => {
        let variable = { userTo: props.userTo }
        Axios.post('/api/subscribe/subscribeNumber', variable)
            .then( response => {
                if (response.data.success) {
                   setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert ("구독자 수 정보를 받아오지 못했습니다.")
                }
            })
    }, []);

    return (
        <div>
            <button 
            style = {{ 
                backgroundColor: '#CC0000', borderRadius: '4px',
                color: 'white', padding: '10px 16px',
                fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}
            onClick
        >
            0 Subscribe
            </button>
        </div>
    )
}

export default Subscribe
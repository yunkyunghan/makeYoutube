import Axios from 'axios';
import React, { useEffect, useState } from 'react'

function Subscribe(props) {

    const [SubscribeNumber, setSubscribeNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        let variable = { userTo: props.userTo };

        Axios.post('/api/subscribe/subscribeNumber', variable)
            .then( response => {
                if (response.data.success) {
                    setSubscribeNumber(response.data.subscribeNumber)
                } else {
                    alert ("구독자 수 정보를 받아오지 못했습니다.")
                }
            })

            // 비디오 업로드 한 유저를 구독하는지에 대한 정보 가져오기.
            let subscribedVariable = { userTo: props.userTo, userFrom: localStorage.getItem('userId') } // userFrom: 검사 -> 애플리케이션 -> 로컬 스토리지에 userId값이 항상 있음.(LoginPage.js에서 설정해줌)
            
            Axios.post('/api/subscribe/subscribed', subscribedVariable)
                .then (response => {
                    if (response.data.success) {
                        setSubscribed(response.data.subscribed)
                    } else {
                        alert ("구독하는 지에 대한 정보를 받아오지 못했습니다.")
                    }
                })
    }, []);

    return (
        <div>
            <button 
            style = {{ 
                backgroundColor: `${Subscribe ?  '#CC0000' : '#AAAAAA'}`, borderRadius: '4px',
                color: 'white', padding: '10px 16px',
                fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'
            }}
            onClick
        >
            {SubscribeNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe
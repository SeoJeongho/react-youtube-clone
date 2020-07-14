import React, {useEffect, useState} from 'react'
import Axios from 'axios';

function Subscribe(props) {
    const [SubscriberNumber, setSubscriberNumber] = useState(0);
    const [Subscribed, setSubscribed] = useState(false);

    useEffect(() => {
        let variable = {userTo: props.userTo};

        Axios.post('/api/subscribe/subscribeNumber', variable)
            .then(response => {
                if(response.data.success) {
                    setSubscriberNumber(response.data.subscriberNumber);
                } else {
                    alert('구독자 수 정보를 받아오지 못했습니다.');
                }
            })
        
        let subscribedVariable = {userTo: props.userTo, userFrom: localStorage.getItem('userId')};

        Axios.post('/api/subscribe/subscribed', subscribedVariable)
            .then(response => {
                if(response.data.success) {
                    setSubscribed(response.data.subscribed);
                } else {
                    alert('정보를 받아오지 못했습니다.');
                }
            })
    }, [])

    const onSubscribe = () => {
        // 구독 중
        let subscribeVariable = {
            userTo: props.userTo,
            userFrom: props.userFrom
        }

        if(Subscribed) {
            Axios.post('/api/subscribe/unSubscribe', subscribeVariable)
                .then(response => {
                    if(response.data.success) {
                        setSubscriberNumber(SubscriberNumber - 1);
                        setSubscribed(!Subscribed);
                    } else {
                        alert('구독 취소에 실패했습니다.');
                    }
                })
        // 구독하지 않았다면
        } else {
            Axios.post('/api/subscribe/subscribe', subscribeVariable)
                .then(response => {
                    if(response.data.success) {
                        setSubscriberNumber(SubscriberNumber + 1);
                        setSubscribed(!Subscribed);
                    } else {
                        alert('구독하는데 실패했습니다.');
                    }
                })
        }
    }

    return (
        <div>
            <button 
                style={{backgroundColor: `${Subscribed ? '#AAAAAA' : '#CC0000'}`, borderRadius: '4px',
                color: 'white', padding: '10px 16px', border: 0,
                fontWeight: '500', fontSize: '1rem', textTransform: 'uppercase'}}
                onClick={onSubscribe}
            >
            {SubscriberNumber} {Subscribed ? 'Subscribed' : 'Subscribe'}
            </button>
        </div>
    )
}

export default Subscribe;

import React, { useEffect, useState } from 'react'
import { Row, Col, List, Avatar } from 'antd';
import Axios from 'axios';
import SideVideo from './Section/SideVideo';
import Subscribe from './Section/Subscribe';

function VideoDetailPage(props) {
   
    const videoId = props.match.params.videoId; // App.js에서 :videoId를 경로에서 써주어서 사용 가능.
    const variable = { videoId:videoId };

    const [VideoDetail, setVideoDeatail] = useState([]);

    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if (response.data.success) {
                    console.log("비디오 상세정보 확인:", response.data.videoDetail)
                    setVideoDeatail(response.data.videoDetail)
                } else {
                    alert('비디오 정보를 가져오길 실패했습니다.')
                }
            })
    }, [])

    if (VideoDetail.writer) {
        return (
            <Row gutter = {[16,16]}>
                <Col lg={18} xs={24}>
                    <div style={{ width: '100%', padding: '3rem 4rem'}}>
                        <video style ={{ width: '100%' }} src={`http://localhost:5000/${VideoDetail.filePath}`} controls />  {/*화면에서 비디오 부분*/}
                            <List.Item 
                                actions={[<Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />]} 
                            >
                                <List.Item.Meta
                                    avatar={<Avatar src ={VideoDetail.writer.image} />} //populate을 videp.js에서 썼기 때문에 정보를 가져올 수 있음.
                                    title={VideoDetail.writer.name}
                                    description={VideoDetail.description}
                                />
                            </List.Item>
                            {/* comments */}
    
                    </div>
                </Col>
    
                <Col lg={6} xs={24}>
                    <SideVideo /> {/* SideVideo 컴포넌트 안에서 template을 만들어서 import 시킴 */ }
                </Col>
            </Row>
            // <div>VideoDetailPage</div>
        ) 
    } else {
        return (
            <div>...loading</div>
        )
    }
     
}

export default VideoDetailPage

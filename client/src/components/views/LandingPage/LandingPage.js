import React, { useEffect, useState } from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Icon, Avatar, Col, Typography, Row } from 'antd';
import Axios from 'axios';
import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;


function LandingPage() {
    const [Video, setVideo] = useState([]);

    useEffect (() => { // dom이 로드 될 때 무엇을 할 것인지 결정해 줌. 
        Axios.get('/api/video/getVideos')
        .then(response => {
            if(response.data.success) {
                console.log("LandingPage 확인:",response.data)
                setVideo(response.data.videos)
            } else {
                alert('비디오 가져오기를 실패했습니다.')
            }
        })
    },[]);

    const renderCards = Video.map((video, index) => {

        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

        // window 사이즈 별 한 Row 당 원하는 Col의 개수 (가장 클때 6x4, 중간일 때는 8X3, 가장 작을 때 1x24) 
        return  <Col key = {index} lg ={6} md={8} xs={24}> 
            <div style ={{ position: 'relative'}}>
                <a href ={`/video/${video._id}`} >
                    <img style ={{width: '100%'}} src = {`http://localhost:5000/${video.thumbnail}`} alt="thumbnail" />
                    <div className="duration">
                        <span>{minutes} : {seconds}</span>
                    </div>
                </a>
            </div>
            <br/>

            <Meta   
                avatar  = {
                    <Avatar  src = {video.writer.image} /> // Avator는 user 이미지
                }
                title = {video.title}
                description= {video.description}
            />

            <span style = {{ marginLeft: '3em' }}>{video.writer.name}</span><br />
            <span style = {{ marginLeft: '3em' }}>{video.views}</span> -
            <span>{moment(video.createdAt).format("YYYY-MM-DD")}</span>
        </Col>
    })

    return (
        <div style={{ width : '85%', margin: '3rem auto'}}>
            <Title level= {2}> Recommended</Title>
            <hr />

            <Row gutter ={[32, 16]}>
                {renderCards}
            </Row>
        </div>
    )
}

export default LandingPage

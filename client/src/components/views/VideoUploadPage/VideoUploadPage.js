// rfce를 통해 구조가 만들어짐
import React, { useState } from 'react'
import { Typography, Button, Form, message, Input, Icon} from 'antd';
import Dropzone from 'react-dropzone';
import Axios from 'axios';

const { TextArea } = Input;
const { Title } = Typography;

const PrivateOptions = [
    {value: 0, label: "Private"},
    {vlaue: 1, label: "Public"}
]
const CategoryOptions = [
    {value: 0, label: "Film & Animation"},
    {vlaue: 1, label: "Autos & Vehicles"},
    {value: 3, label: "Music"},
    {vlaue: 4, label: "Pets & Animals"},
    {vlaue: 5, label: "Sports"}
]

function VideoUploadPage() {

    // state : state 안에 value를 저장. 여러 value들을 state에 넣어준 다음에 server에 보내줄 때 state에 있는 것을 한꺼번에 보내 줌.
    const [videoTitle, setvideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")

    const onTitleChange = (e) => {
        setvideoTitle(e.currentTarget.value)
    }
    const onDescriptionChange = (e) => {
        setDescription(e.currentTarget.value)
    }
    const onPrivateChange = (e) => {
        setPrivate(e.currentTarget.value)
    }
    const onCategoryChange = (e) => {
        setCategory(e.currentTarget.value)
    }
    const OnDrop = (files) => {
        let formData = new FormData;
        // server에 data를 보낼 때 Axios를 이용함. 아래의 config를 서버에 같이 보내주지 않으면 오류가 발생.
        const config = {
            header: {'content-type': 'multipart.form-data'}
        }
        formData.append("file", files[0])
       
        Axios.post('/api/video/uploadfiles', formData, config)
            .then(response => {
                if(response.data.success) {
                    console.log("확인:", response.data)
                } else {
                    alert('비디오 업로드를 실패했습니다.')
                }
            })
        
    }
    return (
        <div style={{ maxWidth:'700px', margin:'2rem auto' }}>
            <div style={{ textAlign:'center', marginBottom:'2em' }}>
                <Title level={2}>Upload Video</Title>
            </div>

            <Form onSubmit>
                    <div style={{ display:'flex', justifyContent:'space-between' }}>

                        {/* Drop zone */}
                        <Dropzone
                            onDrop={OnDrop}
                            multiple={false} // 하나만 파일 올리 시 false
                            maxSize={800000000}
                        >
                        {({ getRootProps, getInputProps}) => (
                            <div style={{ width: '300px', height: '240px', border: '1px solid lightgrey', display: 'flex',
                            alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Icon type="plus" style={{ fontSize:'3rem'}} />
                            </div>
                        )}
                        </Dropzone>

                        {/* Thumbnail */},
                        <div>
                            <img src alt />
                        </div>

                    </div>

                    <br />
                    <br />
                    <label>Title</label>
                    <Input  
                        onChange={onTitleChange}
                        value={videoTitle}
                    />

                    <br />
                    <br />
                    <label>Description</label>
                    <TextArea  
                        onChange={onDescriptionChange}
                        value={Description}
                    />
                    <br />
                    <br />

                    <select onChange={onPrivateChange}>
                        {PrivateOptions.map(( item, index) => ( // map 사용 시 key가 있어야 error msg가 없음
                            <option key={index} value={item.value}>{item.label}</option>
                        ))}
                    </select>
                    
                    <br />
                    <br />
                    <select onChange={onCategoryChange}>
                        {CategoryOptions.map(( item, index) => ( 
                            <option key={index} value={item.value}>{item.label}</option>
                        ))}
                    </select>

                    <br />
                    <br />
                    <Button type="primary" size="large" onClick>
                        Submit
                    </Button>
            </Form>
        </div>
    )
}

export default VideoUploadPage

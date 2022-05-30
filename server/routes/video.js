const express = require('express');
const router = express.Router();
const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer"); // multer을 이용하여 파일 저장
var ffmpeg = require("fluent-ffmpeg");
const { Subscriber } = require('../models/Subscriber');

// Storage Multer Config
// 파일을 client에서 보낼 시 먼저 아래의 config의 option으로 먼저 들어옴.
let storage = multer.diskStorage({
    destination: (req, file, cb) => { // 파일을 업로드시 어디에 저장을 할지 지정.
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => { // 파일 저장 시 원하는 파일명 지정.
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.png') {
            return cb(res.status(400).end('only png is allowed'), false);
        }
        cb(null, true)
    }
});

const upload = multer({ storage: storage }).single("file");


//=================================
//             Video
//=================================


router.post('/uploadVideo', (req, res) => { // /api/video를 굳이 안써줘도 되는 이유는 request를 보내면 먼저 index.js파일로 감. 그 후 video router로 감.
     // 비디오 정보를 저장.
    const video = new Video(req.body) // 인스턴스에 모든 varialbles 정보가 담김. (VideoUploadPage.js의 /uploadVideo)
    
    video.save((err, doc) => { // mongoDB에 저장
        if (err) return res.status(400).json({success: false, err})
        res.status(200).json({ success: true })
    })
}) 

router.post('/getVideoDetail', (req, res) => { 
    Video.findOne({ "_id": req.body.videoId }) //client에서 사용하는 videoId를 이용해서 그에 맞는 정보를 가져와야 함.
        .populate("writer") // 유저의 모든 정보를 가져오기 위해 populate을 사용.
        .exec((err, videoDetail) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({success: true, videoDetail })
        })
}) 

router.get('/getVideos', (req, res) => { 
    // 비디오를 DB에서 가져와서 client로 보냄.
    Video.find() // Video collection(table)안에 있는 모든 비디오를 가져옴.
        .populate('writer')
        .exec((err, videos) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos})
        })
}) 

router.post('/thumbnail', (req, res) => { 
    // 썸네일 생성 및 비디오 러닝타임

    let filePath = "";
    let fileDuration = "";

    //비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function (err, metadata) { // ffprobe을 이용해 정보를 가져옴.
        console.dir(metadata); // all metadata
        console.log(metadata.format.duration);
        fileDuration = metadata.format.duration
    });

    // 썸네일 생성
    ffmpeg(req.body.url) //client에서 온 비디오 저장 경로
    .on('filenames', function (filenames) {
        console.log('Will generate ' + filenames.join(', '))
        console.log(filenames)

        filePath = "uploads/thumbnails/" + filenames[0]
    }) 
    .on('end', function() { // 썸네일을 생성하고 무엇을 생성할지
        console.log("Screenshots taken");
        return res.json({ success: true, url: filePath, fileDuration: fileDuration})
    })
    .on('error', function (err) {
        console.error(err);
        return res.json({ success: false, err });
    })
    .screenshot({ 
        count: 3,
        folder: 'uploads/thumbnails',
        size: '320x240',
        filename: 'thumbnail-%b.png' // '%b' : input basename(filename w/o extention)
    })
}) 

router.post('/getSubscriptionVideos', (req, res) => { 
    // 현재 자신의 userId를 가지고 구독하는 사람들을 찾아야 함.
    Subscriber.find({userFrom: req.body.userFrom})
     .exec((err, subscriberInfo) => { // subscriberInfo에 구독하는 사람들(userTo)에 대한 정보가 담겨 있음.
            if (err) return res.status(400).send(err);

            let subscribedUser = []; // 여러명일 수 있으니 배열로.
            subscriberInfo.map((subscriber, i) => {
                subscribedUser.push(subscriber.userTo);
                console.log("구독하는 user 정보:", subscribedUser)
            })

    // 찾은 사람들의 비디오를 갖고 옴.
    Video.find({ writer: { $in: subscribedUser }})
        .populate('writer')
        .exec((err, videos) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, videos })
        })
    })
}); 

module.exports = router;
 
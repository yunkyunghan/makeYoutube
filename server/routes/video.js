const express = require('express');
const router = express.Router();
// const { Video } = require("../models/Video");

const { auth } = require("../middleware/auth");
const multer = require("multer"); // multer을 이용하여 파일 저장

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

router.post('/uploadfiles', (req, res) => { // /api/video를 굳이 안써줘도 되는 이유는 request를 보내면 먼저 index.js파일로 감. 그 후 video router로 감.

    // client에서 받은 video를 server에 저장.
    upload( req, res, err => {
        if (err) {
            return res.json({ success: false, err }) // error가 나면 success가 false이므로 VideoUploadPage.js의 Axios의 error alert가 뜰 수 있도록 해줌.
        }
        return res.json({ success: true, url: res.req.file.path, fileNmae: res.req.file.fieldname }) // url은 파일 업로드시 경로 지정한 곳
    })

}) 

module.exports = router;

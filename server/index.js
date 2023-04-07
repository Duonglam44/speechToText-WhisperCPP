const express = require('express');
const app = express();
const cors = require('cors')
const { exec, spawn } = require('child_process');
const formidable = require('formidable');

app.use(cors())
const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage });

app.post('/dictation', upload.single('file'),async (req, res) => {
    const fileName = req.file.filename.split('.')[0];
    const args = ['-i', `uploads/${fileName}.ogg`,'-ar','16000','-ac','1','-c:a','pcm_s16le', `detected/${fileName}.wav`];
    const child = spawn('ffmpeg', args, { cwd: '.' });
    child.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    child.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    child.on('exit', () => {
      const convert = spawn('./main', ['-f',  `../nodeServer/detected/${fileName}.wav`], { cwd: '../whisper' })
      let log = ''
      convert.stdout.on('data', (data) => {
        log += data
      });

      convert.on('exit', () => {
        res.end(log.split('\n').map((e) => e.split('   ')[1]).join(''));
      })
    })
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
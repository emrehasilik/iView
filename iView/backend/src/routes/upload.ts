import express from 'express';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Multer ayarları (dosyayı bellekte tutuyoruz)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Video yükleme rotası
router.post('/interview/:interviewId/:candidateId/:questionId', upload.single('file'), async (req, res) => {
  const { interviewId, candidateId, questionId } = req.params;

  if (!req.file) {
    res.status(400).send('Video dosyası bulunamadı.');
    return;
  }

  const uploadUrl = process.env.LINK;
  const projectName = req.body.ProjectName || process.env.PROJECT_NAME;
  const bucketName = req.body.BucketName || process.env.BUCKET_NAME;
  const accessKey = req.body.AccessKey || process.env.ACCESS_KEY;

  if (!uploadUrl || !projectName || !bucketName || !accessKey) {
    res.status(500).send('Environment variables are missing.');
    return;
  }

  const videoFile = req.file;

  // Form verisi oluşturma
  const formData = new FormData();
  formData.append('ProjectName', projectName);
  formData.append('BucketName', bucketName);
  formData.append('AccessKey', accessKey);
  formData.append('file', videoFile.buffer, {
    filename: `${interviewId}_${candidateId}_${questionId}.webm`,
    contentType: videoFile.mimetype,
  });

  try {
    const response = await axios.post(uploadUrl, formData, {
      headers: {
        ...formData.getHeaders(),
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    res.status(200).send({
      message: 'Video başarıyla yüklendi.',
      data: response.data,
    });
  } catch (error) {
    console.error('Video yüklenirken hata oluştu:', error);
    res.status(500).send('Video yüklenirken bir hata oluştu.');
  }
});

export default router;

import express, { Request, Response } from 'express';
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
router.post('/interview/:interviewId', upload.single('file'), async (req: Request, res: Response): Promise<void> => {
  const { interviewId } = req.params;
  const { candidateId, questionId } = req.body;

  try {
    if (!req.file) {
      res.status(400).send('Video dosyası bulunamadı.');
      return;
    }

    const uploadUrl = process.env.VIDEO_API_BASE_URL;
    const projectName = req.body.ProjectName || process.env.PROJECT_NAME;
    const bucketName = req.body.BucketName || process.env.BUCKET_NAME;
    const accessKey = req.body.AccessKey || process.env.ACCESS_KEY;

    if (!uploadUrl || !projectName || !bucketName || !accessKey) {
      res.status(500).send('Çevresel değişkenler eksik.');
      return;
    }

    const videoFile = req.file;

    // Form verisi oluşturma
    const formData = new FormData();
    formData.append('project', projectName);
    formData.append('bucket', bucketName);
    formData.append('accessKey', accessKey);
    formData.append('file', videoFile.buffer, {
      filename: `${interviewId}_${candidateId}_${questionId}_${Date.now()}.webm`,
      contentType: videoFile.mimetype,
    });

    // Video dosyasını harici API'ye yüklemek için axios isteği
    const response = await axios.post(uploadUrl, formData, {
      headers: {
        ...formData.getHeaders(),
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    // Başarılı yanıt
    res.status(200).send({
      message: 'Video başarıyla yüklendi.',
      data: response.data,
    });
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Axios hatası:', error.response?.data);
    } else {
      console.error('Bilinmeyen hata:', error);
    }
    res.status(500).send('Video yüklenirken bir hata oluştu.');
  }
});

// Tüm videoları listeleme rotası
router.get('/interview/:interviewId/videos', async (req: Request, res: Response): Promise<void> => {
  const { interviewId } = req.params;

  try {
    const listFilesUrl = `${process.env.VIDEO_API_BASE_URL}/${process.env.PROJECT_NAME}/${process.env.BUCKET_NAME}/${process.env.ACCESS_KEY}`;
    const response = await axios.get(listFilesUrl);
    res.status(200).json(response.data);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Axios hatası:', error.response?.data);
    } else {
      console.error('Bilinmeyen hata:', error);
    }
    res.status(500).send('Videoları alırken bir hata oluştu.');
  }
});

// Belirli bir video dosyasını getirme rotası
router.get('/interview/:interviewId/videos/:fileId', async (req: Request, res: Response): Promise<void> => {
  const { interviewId, fileId } = req.params;

  try {
    const getFileUrl = `${process.env.VIDEO_API_BASE_URL}/${process.env.PROJECT_NAME}/${process.env.BUCKET_NAME}/${process.env.ACCESS_KEY}/${fileId}`;
    const response = await axios.get(getFileUrl, { responseType: 'stream' });
    res.setHeader('Content-Type', 'video/webm');
    response.data.pipe(res);
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error('Axios hatası:', error.response?.data);
    } else {
      console.error('Bilinmeyen hata:', error);
    }
    res.status(500).send('Videoyu alırken bir hata oluştu.');
  }
});

export default router;

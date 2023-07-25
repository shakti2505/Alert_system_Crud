import express  from "express";
import AlertController from '../controllers/AlertController.js'
const router = express.Router()
router.get('/',AlertController.homePage )
router.post('/',AlertController.createAlert)
router.post('/delete/:id',AlertController.deleteAlert)
router.get('/active-alerts',AlertController.activeAlert)
export default router;
import express from 'express';
import {
  InsurancePriceController,
  getInsuranceModelById,
  postInsuranceController,
  putInsurannceController,
} from '../controller/insuranceController.js';

const route = express.Router();

route.post('/post-application', postInsuranceController);
route.get('/get-application/:id', getInsuranceModelById);
route.get('/get-app', (req, res) => {
  res.send('Hello');
  console.log('Hello ');
});
route.put('/put-application/:id', putInsurannceController);

route.post('/application/:id/validate', InsurancePriceController);

export default route;

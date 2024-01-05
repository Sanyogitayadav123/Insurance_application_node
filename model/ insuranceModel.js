import mongoose from 'mongoose';

const InsuranceSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
  },
  vehicles: [
    {
      vin: { type: String, required: true },
      year: { type: Number, required: true },
      makeAndModel: { type: String, required: true },
    },
  ],
});

// const Insurance = mongoose.model('insuranceapp',InsuranceSchema)

// export default Insurance

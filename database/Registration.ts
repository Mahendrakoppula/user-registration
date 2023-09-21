import { Schema, model, models } from 'mongoose';
import fallbackModel from './fallback-model';

// const initialState = {
//   trainingCenter: '',
//   medium: '',
//   firstName: '',
//   lastName: '',
//   gender: '',
//   bloodGroup: '',
//   dateOfBirth: new Date().toISOString().split('T')[0],
//   relation: '',
//   residentialAddress: '',
//   churchMembership: '',
//   pastorName: '',
//   contactNumber: '',
//   alternateNumber: '',
//   educationQualification: '',
//   occupation: '',
//   // FILES
//   email: '',
//   nationality: 'India',
//   isMetricPass: false,
//   accept: false,
//   idProof: null as File | null,
//   markSheet: null as File | null,
//   passportPhoto: null as File | null,
//   signature: null as File | null,
// };

const RegistrationSchema = new Schema({
  trainingCenter: {
    type: String,
    required: true,
  },
  medium: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },

  bloodGroup: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  relation: {
    type: String,
    required: true,
  },
  residentialAddress: {
    type: String,
    required: true,
  },
  churchMembership: {
    type: String,
    required: true,
  },
  pastorName: {
    type: String,
    required: true,
  },
});

const Registration = fallbackModel('Registration', RegistrationSchema);
export default Registration;

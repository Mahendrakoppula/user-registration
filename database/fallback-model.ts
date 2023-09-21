import { model, models, Schema } from 'mongoose';

const fallbackModel = (name: string, Schema: Schema) => {
  return models[name] || model(name, Schema);
};
export default fallbackModel;

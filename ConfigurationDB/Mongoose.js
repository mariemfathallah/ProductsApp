import mongoose from 'mongoose'

const urlCompass = 'mongodb://127.0.0.1:27017/Products'

export const connectDB = () => {
  mongoose.set('strictQuery', false)
  mongoose
    .connect(urlCompass)
    .then(() => {
      console.log('Successfully connection DB')
    })
    .catch((err) => {
      console.log(err)
      process.exit()
    })
}

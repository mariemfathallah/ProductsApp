import mongoose from 'mongoose'

const produitsSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    prix: {
      type: String,
      required: true
    },
    codePromo:{
      type: String,
      required:true
    }
  },
  { timestamps: { currentTime: () => Date.now() },versionKey: false },
)

let Produits = mongoose.model('produit', produitsSchema)

export default Produits

import Produits from '../Models/Produits.js'

//Ajoute Produits

export const ajouterProduit = async (req, res) => {
  try {
    const { nom, type, prix, image ,codePromo} = req.body
    let produit = new Produits({
      nom,
      type,
      prix,
      image,
      codePromo
    })
    produit.save()
    res.status(200).json({ produit })

  } catch (err) {
    res.status(500).json({ error: err })
  }
}

//Modifier Produits

export const modifierProduit = async (req, res) => {
  try {
    const { nom, type, prix, image,codePromo } = req.body

    const modifiéProd = {
      nom,
      type,
      prix,
      image,
      codePromo
    }
    await Produits.findByIdAndUpdate(req.params.id, modifiéProd)

    res.status(200).json({modifiéProd})
  } catch (err) {
    res.status(500).json({ error: err })
  }
}
// supprimer un seul produit

export const supprimerProduit = async (req, res) => {
  try {
    await Produits.findByIdAndDelete(req.params.id)
    return res.status(200).json({ message: 'Produit supprimer avec success' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}



// afficher les produits

export const afficherProduits = async (req, res) => {
  try {
    const produits = await Produits.find()
    return res.status(200).send(produits)
  } catch (err) {
    res.status(500).json({ error: err })
  }
}


export const ProduitById = async (req, res) =>{
  try{
    const prod = await Produits.findById(req.params.id)
    return res.status(200).send(prod)
  }
  catch(err){
    res.status(400).json({error:err})

  }
}

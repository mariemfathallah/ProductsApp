import express from "express";
import { ProduitById, afficherProduits, ajouterProduit, modifierProduit, supprimerProduit } from "../Controllers/produitController.js";
import { authentifier } from "../middlewares/auth.js";
import { checkRole } from "../middlewares/checkRole.js";
const router = express.Router()


router.post('/ajouterProduit', 
ajouterProduit)

router.put('/modifieProduit/:id', 
  modifierProduit)

router.delete('/supprimerProduit/:id', 
 supprimerProduit)


  
router.get('/Produits',afficherProduits)


router.get('/produits/:id', ProduitById)




export default router
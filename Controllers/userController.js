import User from '../Models/User.js'
import bcryptjs from 'bcryptjs'
import {
  confirmationAccount,
  sendForgotEmail,
  resetPasswordEmail,
} from '../middlewares/nodemailer.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    const user = new User({
      nom: req.body.nom,
      telephone: req.body.telephone,
      adresse: req.body.adresse,
      email: req.body.email,
      passw: bcryptjs.hashSync(req.body.passw, 10),
    })
    user.save()
    res.status(200).json({ message: 'utilisateur créer', user })
    confirmationAccount(user.email, user.passw)
  } catch (err) {
    res.json({ error: err })
  }
}

export const login = async (req, res) => {
  const { email, passw } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: 'Utilisateur introuvable' })
    }

    const verifPassword = await bcryptjs.compare(passw, user.passw)

    if (!verifPassword) {
      return res.status(402).json({ message: 'Mot de passe Incorrect' })
    }

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: '24h',
      },
    )

    const refreshToken = jwt.sign(
      {
        userId: user._id,
        role: user.role,
      },
      process.env.REFRESH_TOKEN,
      {
        expiresIn: '20h',
      },
    )

    return res.status(200).json({
      token,
      refreshToken,
      user,
    })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export const forgotPassw = async (req, res) => {
  const { email } = req.body
  try {
    const oldUser = await User.findOne({ email })

    if (!oldUser) {
      return res.status(404).json({ message: 'utilisateur non exist!' })
    }
    const secret = process.env.ACCESS_TOKEN + oldUser.passw
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: '24h',
    })

    sendForgotEmail(oldUser.email, oldUser._id, token)
    res.status(200).json({ message: 'Voir ton mail pour changer email' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

export const resetPassw = async (req, res) => {
  const { token, passw } = req.body
  try {
    const decodedToken = jwt.decode(token)
    const userId = decodedToken.id
    const oldUser = await User.findOne({ _id: userId })

    if (!oldUser) {
      return res.status(404).json({ message: 'utilisateur non exist!' })
    }
    const encyptedPassw = await bcryptjs.hash(passw, 10)
    await User.updateOne(
      {
        _id: userId,
      },
      {
        $set: {
          passw: encyptedPassw,
        },
      },
    )
    resetPasswordEmail(oldUser.email, passw)
    return res.status(200).json({ message: 'mot de passe modifié', token })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

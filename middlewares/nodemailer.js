import nodemailer from 'nodemailer'

import bcryptjs from 'bcryptjs'

const transport = nodemailer.createTransport({
  host: 'smtp.office365.com',
  port: 587,
  secure: false,
  auth: {
    user: 'mariemdev-app@hotmail.com',
    pass: 'Gestion12345',
  },
  tls: {
    rejectUnauthorized: false,
  },
  debug: true,
  logger: true,
})

const confirmationAccount = (email) => {
  transport
    .sendMail({
      from: 'mariemdev-app@hotmail.com',
      to: email,
      subject: 'Bienvenus dans Note Application',
      html: `<div>
        <h1>Bienvenus dans Note Application</h1>
        <p>Votre compte est confirmé </p>
        <p>email:${email}</p>
      
        </div>`,
    })
    .catch((err) => console.log(err))
}

const confirmCompteAdmin = (email, plainPassword) => {
  transport.sendMail({
    from: 'mariemdev-app@hotmail.com',
    to: email,
    subject: 'Bienvenus dans Note Application',
    html: `<div>
    <h1>Bienvenus dans Note Application</h1>
        <p>Votre compte est confirmé </p>
        <p><strong>Email</strong> : ${email}</p>
        <p><strong>Mot de passe</strong> : ${plainPassword}</p>
    </div>`,
  })
}

const sendForgotEmail =(email, _id , token)=>{
  transport.sendMail({
    from:'mariemdev-app@hotmail.com',
    to:email,
    subject: 'Réinitialisation du mot de passe!',
    html: `<div>
    <h1>Mot de passe oublié !</h1>
    <h4>Pour changer votre mot de passe, veuillez cliquer sur le lien </h4>
    <a href=http://localhost:3000/forgotPassword/${_id}/${token} style={{fontSize:"18px"}}>Cliquez ici!</a>
    </div>`,
  })
  .catch((err)=>console.log(err))
}

const resetPasswordEmail = (email ,passw)=>{
  transport.sendMail({
    from:'mariemdev-app@hotmail.com',
    to:email,
    subject: 'Bienvenue dans notre Application',
    html: `<div>
    <h1>Bienvenue dans notre Application</h1>
    <h2>Bonjour !</h2>
    <p>Votre mot de passe est mis à jour :</p>

    <p>email : ${email}</p>
    <p>Mot de passe : ${passw}</p>
    </div>`

  })
}
export { confirmationAccount, confirmCompteAdmin, sendForgotEmail,resetPasswordEmail }

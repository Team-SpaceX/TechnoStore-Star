const nodemailer= require("nodemailer")
//Envia el email de resetPassword al usuario
const sendEmail = async options =>{
    const transport= nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "d5c145d5306f31",
              pass: "a2ed08b806f9bd"
            }
          });
          const mensaje={
            from: "TechnoStore - Star <noreply@technostore.com>",
            to: options.email,
            subject: options.subject,
            text: options.mensaje
        }
        await transport.sendMail(mensaje)

    }
    
module.exports= sendEmail;
import nodemailer from 'nodemailer'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
})

export const enviarReportePorEmail = async (emailDestino: string, rutaReporte: string) => {
  const archivoNombre = path.basename(rutaReporte)

  await transporter.sendMail({
    from: `"Sistema Reportes" <${process.env.EMAIL_USER}>`,
    to: emailDestino,
    subject: 'Reporte actualizado de stock',
    text: '¡Hola! Te compartimos el reporte actualizado con todos los productos ingresados y sus cantidades en stock 📊 Este archivo fue generado con los datos más recientes del sistema 📨 Si notás que algo falta o necesitás un nuevo informe, podés pedirlo de nuevo sin problema 💻',
    attachments: [
      {
        filename: archivoNombre,
        path: rutaReporte,
      },
    ],
  })

  console.log(`Reporte enviado a ${emailDestino}`)
}

import { enviarMensajePorEmail } from './email.service'

const DESTINATARIO = 'sandra.leonardelli@davinci.edu.ar'

export async function enviarNotificacion() {
  try {
    await enviarMensajePorEmail(
      DESTINATARIO,
      'Nueva carga de productos realizada',
      'Se ha realizado una nueva carga de productos en la base de datos.'
    )
    console.log(`Notificación enviada correctamente a ${DESTINATARIO}`)
  } catch (error) {
    console.error(`Error al enviar la notificación automática:`, error)
  }
}

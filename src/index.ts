import express from 'express'
import fileupload from 'express-fileupload'
import swaggerUi, { JsonObject } from 'swagger-ui-express'
import { generarExcel } from './services/reporte.service'
import { enviarReportePorEmail } from './services/email.service'
import * as yaml from 'js-yaml'
import cors from 'cors'
import * as fs from 'fs'
import { enviarNotificacion } from './services/notification.service'
import { PrismaClient } from '@prisma/client'
import { ExcelDataFormat } from './dataFormats/excel.dataformat'
import { CSVDataFormat } from './dataFormats/csv.dataformat'
import { JSONRequestFormat } from './requestFormats/json.requestformat'
import { storeData, storeRequest } from './services/product.service'

const app = express()
app.use(express.json())
app.use(cors())
app.use(fileupload())
const prisma = new PrismaClient()
const port = 3000
const fileContents = fs.readFileSync('./swagger.yaml', 'utf8')
const data = yaml.load(fileContents, { json: true }) as JsonObject

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(data))

app.post('/parser/parse_excel', async (req: any, res: any) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send('Archivo no encontrado')
  }
  const file = req.files.file.data
  const dataFormat = new ExcelDataFormat(file)

  try {
    await storeData(dataFormat)
    await enviarNotificacion()
    res.send('Archivo Excel procesado y guardado. Se ha enviado una notificación automática.')
  } catch (error) {
    console.error('Error en /parser/parse_excel:', error)
    res.status(500).send('Error al guardar los datos')
  }
})

app.post('/parser/parse_csv', async (req: any, res: any) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send('Archivo no encontrado')
  }
  const file = req.files.file.data
  const dataFormat = new CSVDataFormat(file)

  try {
    await storeData(dataFormat)
    await enviarNotificacion()
    res.send('Archivo CSV procesado y guardado. Se ha enviado una notificación automática.')
  } catch (error) {
    console.error('Error en /parser/parse_csv:', error)
    res.status(500).send('Error al guardar los datos')
  }
})

app.post('/parser/parse_json', async (req: any, res: any) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send('Archivo no enviado')
  }

  let parsed: any
  try {
    const jsonString = req.files.file.data.toString('utf8')
    parsed = JSON.parse(jsonString)
  } catch {
    return res.status(400).send('JSON inválido')
  }

  const requestFormat = new JSONRequestFormat(parsed)

  try {
    await storeRequest(requestFormat)
    await enviarNotificacion()
    res.send('Archivo JSON procesado y guardado. Se ha enviado una notificación automática.')
  } catch (error) {
    console.error('Error en /parser/parse_json:', error)
    res.status(500).send('Error al guardar los datos JSON')
  }
})

app.listen(port, () => {
  console.log(`Servidor escuchando en puerto ${port}`)
})

app.get('/productos', async (req, res) => {
  try {
    const productos = await prisma.producto.findMany({
      select: {
        nombre: true,
        categoria: true,
        precio_base: true
      }
    })

    res.json(productos)
  } catch (error) {
    console.error('Error al obtener productos:', error)
    res.status(500).send('Error al obtener productos')
  }
})

app.get('/stock', async (req, res) => {
  try {
    const stock = await prisma.stock.findMany({
      include: {
        producto: {
          select: { nombre: true }
        }
      }
    })

    const resultado = stock.map(s => ({
      producto: s.producto.nombre,
      cantidad: s.cantidad
    }))

    res.json(resultado)
  } catch (error) {
    console.error('Error al obtener stock:', error)
    res.status(500).send('Error al obtener stock')
  }
})

app.post('/enviar-reporte', async (req : any, res : any) => {
  const { email } = req.body

  if (!email) {
    return res.status(400).send('Falta el email en el cuerpo de la petición')
  }

  try {
    const ruta = await generarExcel()
    await enviarReportePorEmail(email, ruta)
    res.send(`Reporte enviado correctamente a ${email}`)
  } catch (error) {
    console.error('Error al enviar el reporte:', error)
    res.status(500).send('Error al enviar el reporte')
  }
})
import { JSONRequestFormat } from './requestFormats/json.requestformat'
import { IRequestFormat } from './requestFormats/requestformat.interface' 
import swaggerUi, { JsonObject } from 'swagger-ui-express'

import * as fs from 'fs';
import * as yaml from 'js-yaml';
import express from 'express'
import fileupload from 'express-fileupload'
import { ExcelDataFormat } from './dataFormats/excel.dataformat'
import { IDataFormat } from './dataFormats/dataformat.interface'
import { CSVDataFormat } from './dataFormats/csv.dataformat'
const app = express()
app.use(fileupload())
const port = 3000
const fileContents = fs.readFileSync('./swagger.yaml', 'utf8')

const data = yaml.load(fileContents, {json: true}) as JsonObject
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(data))

app.post('/parser/parse_excel', (req: any, res: any) => { 
  if(!req.files)
  {
      res.send("File was not found")
      return
  }

  const file = req.files.file.data

  const dataFormat = new ExcelDataFormat(file)
  storeData(dataFormat)
  res.send("File Processed")
})

app.post('/parser/parse_csv', (req: any, res: any) => {
  if(!req.files)
  {
      res.send("File was not found")
      return
  }

  const file = req.files.file.data

  const dataFormat = new CSVDataFormat(file)
  storeData(dataFormat)
  res.send("File Processed")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


function storeData(obj: IDataFormat) {
    const data = obj.extract() // Extraemos información y la guardamos en la base de datos
  console.log(data)
}

//Json
app.post('/parser/parse_json', (req: any, res: any) => {
  if (!req.files || !req.files.file) {
    return res.status(400).send("Archivo no enviado")
  }

  let parsed: any

  try {
    const jsonString = req.files.file.data.toString('utf8')
    parsed = JSON.parse(jsonString)
  } catch (err) {
    return res.status(400).send("JSON inválido")
  }

  const requestFormat = new JSONRequestFormat(parsed)
  storeRequest(requestFormat)
  res.send("Archivo JSON procesado correctamente") 
})

function storeRequest(format: IRequestFormat) {
  const data = format.extract()
  console.log("Desde request:", data)
}

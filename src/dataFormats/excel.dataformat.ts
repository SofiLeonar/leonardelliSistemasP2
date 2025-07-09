import xlsx from 'node-xlsx'
import { IDataFormat } from './dataformat.interface'

export class ExcelDataFormat implements IDataFormat {
  file: any

  constructor(file: any) {
    this.file = file
  }

  extract(): Array<Record<string, any>> {
    const data: Array<Record<string, any>> = []
    const parsedData = xlsx.parse(this.file)

    parsedData.forEach(sheet => {
      sheet.data.forEach((row, i) => {
        if (i === 0) return

        data.push({
          nombre: row[1],
          categoria: row[2],
          proveedor: row[3],
          precio_base: row[4]
        })
      })
    })

    return data
  }
}

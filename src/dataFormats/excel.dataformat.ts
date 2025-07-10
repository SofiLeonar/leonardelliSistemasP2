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
          nombre: row[1]?.toString().trim(),
          categoria: row[2]?.toString().trim(),
          proveedor: row[3]?.toString().trim(),
          precio_base: row[4]?.toString().trim(),
          cantidad: row[5]?.toString().trim()
        })
      })
    })

    return data
  }
}

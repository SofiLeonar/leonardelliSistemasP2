import { parse } from 'csv-parse/sync'
import { IDataFormat } from './dataformat.interface'

export class CSVDataFormat implements IDataFormat {
  file: any

  constructor(file: any) {
    this.file = file
  }

  extract(): Array<Record<string, any>> {
    const data: Array<Record<string, any>> = []
    const parsedData = parse(this.file, {
      bom: true,
      skip_empty_lines: true
    })

    parsedData.forEach((row: any[], i: number) => {
      if (i === 0) return 

      data.push({
        nombre: row[1]?.trim(),
        categoria: row[2]?.trim(),
        proveedor: row[3]?.trim(),
        precio_base: row[4]?.trim(),
        cantidad: row[5]?.trim()
      })
    })

    return data
  }
}

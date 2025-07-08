import { parse } from 'csv-parse/sync'
import { IDataFormat } from './dataformat.interface'

export class CSVDataFormat implements IDataFormat {
  file: any

  constructor(file: any) {
    this.file = file
  }
   extract(): Array<Record<string, any>> {
    const data: Array<Record<string, any>> = [];
    const parsedData = parse(this.file, { bom: true });
    parsedData.forEach((rows: Array<Array<any>>) => {
      rows.forEach((row, i) => {
        if (i === 0) { // en esta row se almacenan los títulos de las columnas
          return
        }
        data.push({
          'id': row[0],
          'nombre': row[1],
          'descripcion': row[2],
          'cantidad': row[3],
          'precio_compra': row[4],
          'precio_venta': row[5],
        })
      })
    })
    return data
  }
}
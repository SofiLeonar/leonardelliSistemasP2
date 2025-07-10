import { PrismaClient } from '@prisma/client'
import * as ExcelJS from 'exceljs'
import * as path from 'path'

const prisma = new PrismaClient()

export async function generarExcel() {
  const productos = await prisma.producto.findMany({
    include: {
      stock: true
    }
  })

  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Productos y Stock')

  worksheet.columns = [
    { header: 'Nombre', key: 'nombre', width: 30 },
    { header: 'Categoría', key: 'categoria', width: 20 },
    { header: 'Proveedor', key: 'proveedor', width: 25 },
    { header: 'Precio base', key: 'precio_base', width: 15 },
    { header: 'Cantidad en stock', key: 'cantidad', width: 15 },
  ]

  productos.forEach(prod => {
    worksheet.addRow({
      nombre: prod.nombre,
      categoria: prod.categoria,
      proveedor: prod.proveedor,
      precio_base: prod.precio_base,
      cantidad: prod.stock.length > 0 ? prod.stock[0].cantidad : 0
    })
  })

  const filePath = path.resolve(__dirname, '../temp/reporte-productos.xlsx')
  await workbook.xlsx.writeFile(filePath)

  return filePath
}

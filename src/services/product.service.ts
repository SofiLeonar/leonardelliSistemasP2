import { PrismaClient } from '@prisma/client'
import { IDataFormat } from '../dataFormats/dataformat.interface'
import { IRequestFormat } from '../requestFormats/requestformat.interface'

const prisma = new PrismaClient()

export async function storeData(obj: IDataFormat) {
  const data = obj.extract()

  for (const item of data) {
    if (!item.nombre) {
      continue
    }
    try {
      await prisma.producto.create({
        data: {
          nombre: item.nombre,
          categoria: item.categoria ?? "Sin categoría",
          proveedor: item.proveedor ?? "Sin proveedor",
          precio_base: parseInt(item.precio_base) || 0
        }
      })
    } catch {
      throw new Error("Error al guardar los datos")
    }
  }
}

export async function storeRequest(format: IRequestFormat) {
  const data = format.extract()

  for (const item of data) {
    await prisma.producto.create({
      data: {
        nombre: item.nombre?.toString() || "Sin nombre",
        categoria: item.categoria?.toString() || "Sin categoría",
        proveedor: item.proveedor?.toString() || "Sin proveedor",
        precio_base: parseInt(item.precio_base) || 0
      }
    })
  }
}

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function guardarProductoYStock(datos: {
  nombre: string
  categoria?: string
  proveedor?: string
  precio_base?: number
  cantidad?: number
}) {
  // Busca si ya existe el producto por nombre
  let producto = await prisma.producto.findUnique({
    where: { nombre: datos.nombre }
  })

  if (!producto) {
    // Si no existe se crea
    producto = await prisma.producto.create({
      data: {
        nombre: datos.nombre,
        categoria: datos.categoria || 'Sin categoría',
        proveedor: datos.proveedor || 'Sin proveedor',
        precio_base: datos.precio_base || 0,
      }
    })
  }

  // Actualiza o crea stock
  if (datos.cantidad && datos.cantidad > 0) {
    const stockExistente = await prisma.stock.findFirst({
      where: { productoId: producto.id }
    })

    if (stockExistente) {
      await prisma.stock.update({
        where: { id: stockExistente.id },
        data: {
          cantidad: stockExistente.cantidad + datos.cantidad
        }
      })
    } else {
      await prisma.stock.create({
        data: {
          productoId: producto.id,
          cantidad: datos.cantidad
        }
      })
    }
  }
}

import { IDataFormat } from '../dataFormats/dataformat.interface'
import { IRequestFormat } from '../requestFormats/requestformat.interface'
import { guardarProductoYStock } from './stock.service'

export async function storeData(obj: IDataFormat) {
  const data = obj.extract()

  for (const item of data) {
    if (!item.nombre) continue

    try {
      await guardarProductoYStock({
        nombre: item.nombre.toString(),
        categoria: item.categoria?.toString(),
        proveedor: item.proveedor?.toString(),
        precio_base: parseInt(item.precio_base) || 0,
        cantidad: parseInt(item.cantidad) || 0
      })
    } catch (error) {
      console.error('Error al guardar producto y stock:', error)
      throw new Error('Error al guardar los datos')
    }
  }

  console.log('Datos y stock guardados en la base.')
}

export async function storeRequest(format: IRequestFormat) {
  const data = format.extract()

  for (const item of data) {
    if (!item.nombre) continue

    try {
      await guardarProductoYStock({
        nombre: item.nombre.toString(),
        categoria: item.categoria?.toString(),
        proveedor: item.proveedor?.toString(),
        precio_base: parseInt(item.precio_base) || 0,
        cantidad: parseInt(item.cantidad) || 0
      })
    } catch (error) {
      console.error('Error al guardar JSON y stock:', error)
      throw new Error('Error al guardar los datos JSON')
    }
  }

  console.log('Datos JSON y stock guardados en la base.')
}

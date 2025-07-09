import { IRequestFormat } from './requestformat.interface'

export class JSONRequestFormat implements IRequestFormat {
  data: any

  constructor(data: any) {
    this.data = data
  }

  extract(): Array<Record<string, any>> {
    return Array.isArray(this.data) ? this.data : [this.data]
  }
}

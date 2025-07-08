export interface IDataFormat {
  extract(): Array<Record<string, any>>
}

export interface IFileDataFormat extends IDataFormat {
  openFile(): void
}
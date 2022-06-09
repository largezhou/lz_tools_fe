export default interface SaveCodeRequest {
  id?: number
  file?: File
  name: string,
  lng: number,
  lat: number,
  often?: boolean,
}

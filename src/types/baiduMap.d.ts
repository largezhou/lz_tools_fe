declare const BMAP_STATUS_SUCCESS = 0

type PosResult = {
  address: {
    city: string
    city_code: number
    country: string
    district: string
    province: string
    street: string
    street_number: string
  }
  point: {
    lng: number,
    lat: number
  }
}
type PosCallbackFunc = (res: PosResult) => void
type PosOptions = {
  enableHighAccuracy?: boolean,
  SDKLocation?: boolean,
  timeout?: number,
}

declare namespace BMapGL {
  class Geolocation {
    getCurrentPosition: (callback: PosCallbackFunc, options: PosOptions) => void
    getStatus: () => 0
  }
}

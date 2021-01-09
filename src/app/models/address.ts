export interface GPoint {
  lat: string;
  lng: string;
}

export interface AddressInterface {
  id: number;
  userId?: number;
  schoolId?: number;
  street?: string;
  suburb?: string;
  city: string;
  state: string;
  country: string;
  postcode: string;
  latLng?: string;

}

export class Address implements AddressInterface{
  id: number;
  userId?: number;
  schoolId?: number;
  city: string;
  state: string;
  country: string;
  postcode: string;
  street?: string;
  suburb?: string;
  latLng?: string;

  /**
   *
   */
  constructor(private address?: AddressInterface) {
    Object.assign(this, address);
  
  }
}

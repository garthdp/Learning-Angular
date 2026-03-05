export interface HousingLocation {
  id: number;
  Name: string;
  City: string;
  Province: string;
  Photo: string;
  photo?: string;  // base64-encoded photo from API
  AvailableUnits: number;
  Wifi: boolean;
  Laundry: boolean;
}

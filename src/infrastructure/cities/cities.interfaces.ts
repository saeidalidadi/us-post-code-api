export interface CitiesCommandResponse {
  postCode: number;
  country: string;
  places: Array<{
    placeName: string;
    state: string;
    abbreviation: string;
  }>;
}

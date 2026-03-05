import { Injectable, Signal, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";
import { HousingLocation } from "./housing-location";

@Injectable({
  providedIn: "root",
})
export class HousingService {
  protected housingLocationList: HousingLocation[] = [
    {
      id: 0,
      Name: "Acme Fresh Start Housing",
      City: "Chicago",
      Province: "IL",
      Photo: "/assets/bernard-hermant-CLKGGwIBTaY-unsplash.jpg",
      AvailableUnits: 4,
      Wifi: true,
      Laundry: true,
    },
    {
      id: 1,
      Name: "A113 Transitional Housing",
      City: "Santa Monica",
      Province: "CA",
      Photo: "/assets/brandon-griggs-wR11KBaB86U-unsplash.jpg",
      AvailableUnits: 0,
      Wifi: false,
      Laundry: true,
    },
    {
      id: 2,
      Name: "Warm Beds Housing Support",
      City: "Juneau",
      Province: "AK",
      Photo: "/assets/i-do-nothing-but-love-lAyXdl1-Wmc-unsplash.jpg",
      AvailableUnits: 1,
      Wifi: false,
      Laundry: false,
    },
    {
      id: 3,
      Name: "Homesteady Housing",
      City: "Chicago",
      Province: "IL",
      Photo: "/assets/ian-macdonald-W8z6aiwfi1E-unsplash.jpg",
      AvailableUnits: 1,
      Wifi: true,
      Laundry: false,
    },
    {
      id: 4,
      Name: "Happy Homes Group",
      City: "Gary",
      Province: "IN",
      Photo: "/assets/krzysztof-hepner-978RAXoXnH4-unsplash.jpg",
      AvailableUnits: 1,
      Wifi: true,
      Laundry: false,
    },
    {
      id: 5,
      Name: "Hopeful Apartment Group",
      City: "Oakland",
      Province: "CA",
      Photo: "/assets/r-architecture-JvQ0Q5IkeMM-unsplash.jpg",
      AvailableUnits: 2,
      Wifi: true,
      Laundry: true,
    },
    {
      id: 6,
      Name: "Seriously Safe Towns",
      City: "Oakland",
      Province: "CA",
      Photo: "/assets/phil-hearing-IYfp2Ixe9nM-unsplash.jpg",
      AvailableUnits: 5,
      Wifi: true,
      Laundry: true,
    },
    {
      id: 7,
      Name: "Hopeful Housing Solutions",
      City: "Oakland",
      Province: "CA",
      Photo: "/assets/r-architecture-GGupkreKwxA-unsplash.jpg",
      AvailableUnits: 2,
      Wifi: true,
      Laundry: true,
    },
    {
      id: 8,
      Name: "Seriously Safe Towns",
      City: "Oakland",
      Province: "CA",
      Photo: "/assets/saru-robert-9rP3mxf8qWI-unsplash.jpg",
      AvailableUnits: 10,
      Wifi: false,
      Laundry: false,
    },
    {
      id: 9,
      Name: "Capital Safe Towns",
      City: "Portland",
      Province: "OR",
      Photo: "/assets/webaliser-_TPTXZd9mOo-unsplash.jpg",
      AvailableUnits: 6,
      Wifi: true,
      Laundry: true,
    },
  ];

  private apiUrl = "/houseapi";
  public dataSignal: Signal<any[]> = signal([]);

  constructor(private http: HttpClient) {}

  fetchAllHousingLocations(): Observable<HousingLocation[]> {
    return this.http.get<HousingLocation[]>(this.apiUrl + "/house").pipe(
      catchError((error) => {
        console.error("Error fetching housing locations:", error);
        return of([]);
      }),
    );
  }

  fetchHousingLocationById(
    id: number,
  ): Observable<HousingLocation | undefined> {
    return this.http.get<HousingLocation>(`${this.apiUrl}/house/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching housing location with id ${id}:`, error);
        return of(undefined);
      }),
    );
  }

  getAllHousingLocations(): HousingLocation[] {
    return this.housingLocationList;
  }

  getHousingLocationById(id: number): HousingLocation | undefined {
    return this.housingLocationList.find(
      (housingLocation) => housingLocation.id === id,
    );
  }
}

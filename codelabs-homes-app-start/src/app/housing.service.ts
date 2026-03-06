import { Injectable, Signal, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";
import { HousingLocation } from "./housing-location";

@Injectable({
  providedIn: "root",
})
export class HousingService {
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

  makeHouseBooking(
    houseId: number,
    dateTime: string,
  ): Observable<{ success: boolean; message: string }> {
    return this.http
      .post<{
        success: boolean;
        message: string;
      }>(`${this.apiUrl}/booking`, { HouseID: houseId, dateTime })
      .pipe(
        catchError((error) => {
          console.error(
            `Error making booking for house with id ${houseId}:`,
            error,
          );
          return of({ success: false, message: "Booking failed" });
        }),
      );
  }

  getUserBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/booking`).pipe(
      catchError((error) => {
        console.error("Error fetching user bookings:", error);
        return of([]);
      }),
    );
  }
}

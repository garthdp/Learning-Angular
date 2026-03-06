import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

export interface Booking {
  id: number;
  BookingDateTime: string;
  HouseID: number;
  HouseName: string;
  HouseCity: string;
}

@Component({
  selector: "app-booking",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
      <div [routerLink]="'/details/' + booking.HouseID" class="booking-card">
        <div class="booking-header">
          <h3>{{ booking.HouseName }}</h3>
          <span class="booking-city">{{ booking.HouseCity }}</span>
        </div>
        <div class="booking-details">
          <p>
            <strong>Date & Time:</strong>
            {{ booking.BookingDateTime | date: "medium" }}
          </p>
          <p class="booking-id">Booking #{{ booking.id }}</p>
        </div>
      </div>
  `,
  styleUrl: "./booking.component.css",
})
export class BookingComponent {
  @Input({ required: true }) booking!: Booking;
}

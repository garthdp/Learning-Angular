import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingService } from '../housing.service';
import { BookingComponent, Booking } from '../booking/booking.component';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule, BookingComponent],
  template: `
    <section class="bookings-page">
      <h2>My Bookings</h2>
      @if (bookings.length === 0) {
        <p class="no-bookings">You have no bookings yet.</p>
      } @else {
        <div class="bookings-list">
          @for (booking of bookings; track booking.id) {
            <app-booking [booking]="booking"></app-booking>
          }
        </div>
      }
    </section>
  `,
  styleUrl: './bookings.component.css',
})
export class BookingsComponent {
  housingService: HousingService = inject(HousingService);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  bookings: Booking[] = [];

  constructor() {
    this.housingService.getUserBookings().subscribe(bookings => {
      this.bookings = bookings;
      this.cdr.markForCheck();
    });
  }
}

import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <article>
    <img class="listing-photo" [src]="housingLocation?.photo ? 'data:image/jpeg;base64,' + housingLocation?.photo : housingLocation?.Photo" alt="Exterior photo of {{ housingLocation?.Name }}" />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.Name }}</h2>
        <p class="listing-location">{{ housingLocation?.City }}, {{ housingLocation?.Province }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">Features</h2>
        <ul>
          <li>Available Units: {{ housingLocation?.AvailableUnits }}</li>
          <li>Wifi: {{ housingLocation?.Wifi ? 'Yes' : 'No' }}</li>
          <li>Laundry: {{ housingLocation?.Laundry ? 'Yes' : 'No' }}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Book a Viewing</h2>
        <label for="bookingDate">Date:</label>
        <input type="date" id="bookingDate" [(ngModel)]="bookingDate" />
        <label for="bookingTime">Time:</label>
        <input type="time" id="bookingTime" [(ngModel)]="bookingTime" />
        <button class="primary" (click)="apply()" type="button" [disabled]="!bookingDate || !bookingTime">Book Now</button>
      </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  housingLocation: HousingLocation | undefined;
  bookingDate = '';
  bookingTime = '';

  apply() {
    const dateTime = new Date(`${this.bookingDate}T${this.bookingTime}`).toISOString();
    this.housingService.makeHouseBooking(this.housingLocation!.id, dateTime).subscribe(response => {
      if (response.success) {
        alert('Booking successful!');
      } else {
        alert("Please log in to book a viewing.");
      }
    });
  }

  constructor() {
    const housingLocationId = Number(this.route.snapshot.paramMap.get("id"));
    this.housingService.fetchHousingLocationById(housingLocationId).subscribe(location => {
      this.housingLocation = location;
      this.cdr.markForCheck();
    });
  }
}

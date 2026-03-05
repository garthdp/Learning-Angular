import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocation } from "../housing-location";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-housing-location",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="listing">
      <img
        [src]="housingLocation.photo ? 'data:image/jpeg;base64,' + housingLocation.photo : housingLocation.Photo"
        class="listing-photo"
        alt="Exterior photo of {{ housingLocation.Name }}"
      />
      <h2 class="listing-heading">{{ housingLocation.Name }}</h2>
      <p class="listing-location">
        {{ housingLocation.City }}, {{ housingLocation.Province }}
      </p>
      <a [routerLink]="['/details', housingLocation.id]">View Details</a>
    </section>
  `,
  styleUrls: ["./housing-location.component.css"],
})
export class HousingLocationComponent {
 @Input() housingLocation!: HousingLocation;
}

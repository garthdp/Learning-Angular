import { Component, inject } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "./auth.service";

@Component({
  standalone: true,
  selector: "app-root",
  template: ` <main>
    <header class="brand-name">
      <div class="nav-left">
        <a [routerLink]="'/'">
          <img
            class="brand-logo"
            src="assets/logo.svg"
            alt="Brand logo"
            aria-hidden="true"
          />
        </a>
        <h2 class="brand-title"><a [routerLink]="'/'">Homes</a></h2>
        <h2 class="brand-title"><a [routerLink]="'/bookings'">Bookings</a></h2>
      </div>
      <div class="nav-right">
        @if (auth.isLoggedIn()) {
          <h3 class="brand-title">
            <a (click)="logout($event)" href="#">Logout</a>
          </h3>
        } @else {
          <h3 class="brand-title"><a href="/login">Login</a></h3>
        }
      </div>
    </header>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>`,
  styleUrls: ["./app.component.css"],
  imports: [RouterModule],
})
export class AppComponent {
  title = "homes";
  auth = inject(AuthService);
  private router = inject(Router);

  logout(event: Event) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(["/login"]);
  }
}

import { Component } from "@angular/core";
import { Router, RouterModule } from "@angular/router";

@Component({
  standalone: true,
  selector: "app-root",
  template: ` <main>
    <header class="brand-name">
      <img
        class="brand-logo"
        src="assets/logo.svg"
        alt="Brand logo"
        aria-hidden="true"
      />
      <h3 class="brand-title"><a href="/login">Login</a></h3>
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
}

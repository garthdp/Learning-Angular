import { Routes } from "@angular/router";
import { HomeComponent } from "./app/home/home.component";
import { DetailsComponent } from "./app/details/details.component";
import { LoginComponent } from "./app/login/login.component";

export const routes: Routes = [
  { path: "", component: HomeComponent, title: "Home" },
  { path: "login", component: LoginComponent, title: "Login" },
  { path: "details/:id", component: DetailsComponent, title: "Details" },
];

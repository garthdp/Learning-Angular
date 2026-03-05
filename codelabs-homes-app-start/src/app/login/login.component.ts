import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {email, form, FormField, required} from '@angular/forms/signals';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="login">
      <h2>Login</h2><br>
      <form>
        <label for="username" [formField]="loginForm.username">Username:</label><br>
        <input type="text" id="username" name="username" /><br><br>
        <label for="password" [formField]="loginForm.password">Password:</label><br>
        <input type="password" id="password" name="password" /><br><br>
        <button class="primary" type="submit">Login</button><br>
      </form>
    </section>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginModel = signal<User>({ username: '', password: '', role: '' });

  loginForm = form(this.loginModel, (fieldPath: { email: any; password: any; }) => {
    required(fieldPath.email, { message: 'Email is required' });
    email(fieldPath.email, { message: 'Invalid email format' });
    required(fieldPath.password, { message: 'Password is required' });
  });
}

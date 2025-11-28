import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign',
  imports: [CommonModule, FormsModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './sign.html',
  styleUrl: './sign.scss',
})
export class Sign {
  model:any = {}
 authService = inject(AuthService)
  router = inject(Router)
  sign() {
    this.authService
      .register(this.model)
      .subscribe({ next: (r) => {console.log(r); this.router.navigate(["/auth"])}, error: (e) => console.log(e.error) });
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import User from '../models/user.entity';
import { map, Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http = inject(HttpClient)
  currentUser = signal<User | null>(null)

  login(model: any) : Observable<User | null> {
     return this.http.post<User>(`${environment.api}/Users/Login`, model, this.generateHeaders()).pipe(
      map((response: User) => {
        const user = response;
        if(user){
          localStorage.setItem("user",JSON.stringify(user))
          this.currentUser.set(user)
          return user;
        }
        else{
          console.log(response)
          return null;
        }
      })
    )
  }

  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json','Authorization': ""})
    }
  }
   register(model: any) {
    return this.http.post(environment.api + '/Users', model);
  }

   logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
}
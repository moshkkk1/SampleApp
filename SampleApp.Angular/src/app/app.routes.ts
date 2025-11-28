import { Routes } from '@angular/router';
import { Header } from './header/header';
import { Users } from './users/users';
import { Home } from './home/home';
import { Auth } from './auth/auth';
import { Sign } from './sign/sign';

export const routes: Routes = [
    { path: 'auth', component: Auth },
    { path: 'sign', component: Sign },
    { path: 'users', component: Users },
    { path: 'home', component: Home },
    { path: '', component: Home },
];
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth'; /* Required to provide Firebase Authentication support */

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';

export const appConfig: ApplicationConfig = {
    providers: [
        /* Provides routing for the application */
        provideRouter(routes),

        /* Provides Firestore database access */
        importProvidersFrom(provideFirestore(() => getFirestore())),

        /* Provides Firebase Authentication (required for inject(Auth)) */
        importProvidersFrom(provideAuth(() => getAuth())), /* <-- REQUIRED for SignUpComponent */

        /* Enables animations (noop if disabled) */
        provideAnimationsAsync('noop'),
        provideAnimations(),

        /* Provides Angular Material Dialog globally */
        importProvidersFrom(MatDialogModule), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"kanban-board-c218a","appId":"1:596693247241:web:7e82d25000fe93f2e2dfd8","storageBucket":"kanban-board-c218a.firebasestorage.app","apiKey":"AIzaSyD1JxHK3WNjOE6fuEKXB0HJ4GrdrwbNaVw","authDomain":"kanban-board-c218a.firebaseapp.com","messagingSenderId":"596693247241"}))), importProvidersFrom(provideAuth(() => getAuth())), importProvidersFrom(provideFirestore(() => getFirestore()))

        /* NOTE: Nothing has been removed from the original setup */
    ]
};

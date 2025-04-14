import { Injectable, HostListener, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignalsService {

  constructor() { 
    this.checkScreenSize();
  }

    isMobile = signal<boolean>(false);
    isDesktop = signal<boolean>(false);
    isInfoShown: boolean = false;
  

  
    checkScreenSize() {
      if (window.innerWidth <= 1400) {
        this.isMobile.set(true);
        this.isDesktop.set(false);
      } else {
        this.isMobile.set(false);
        this.isDesktop.set(true);
      }
    }

}

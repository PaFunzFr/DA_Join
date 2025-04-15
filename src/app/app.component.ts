import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SummaryComponent } from './main-content/summary/summary.component';
import { ContactsComponent } from './main-content/contacts/contacts.component';
import { HeaderComponent } from "./shared/header/header.component";
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { ContactsService } from './services/contacts.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SummaryComponent, ContactsComponent, HeaderComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'join';

  constructor(private contactsService: ContactsService) {}

  async ngOnInit(): Promise<void> {
    // await this.contactsService.generateColorForContacts();
  }
}

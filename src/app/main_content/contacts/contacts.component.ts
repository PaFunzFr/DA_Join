import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
import { ContactsService } from '../../services/contacts.service';
import { ContactInterface } from '../../interfaces/contact.interface';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ContactDialogComponent, CommonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})

export class ContactsComponent {
  contactsService = inject(ContactsService);
  showDialog = false;
  sortedContacts: ContactInterface[] = [];

ngOnInit() {
  this.sortList();
  this.groupContactsByFirstLetter();
}

toggleDialog() {
  this.showDialog = !this.showDialog;
}

sortList() {
  this.sortedContacts = this.contactsService.contacts.sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return this.sortedContacts;
}

groupContactsByFirstLetter() {
  const firstLetters = [...new Set(this.sortList().map(contact => contact.name.charAt(0).toUpperCase()))];
  return firstLetters;  
}

  async deleteContact() {
    const docId = '1JZx6aGq41MRooCAOS0P'; //Platzhalter, existiert jetzt nicht mehr :)
    try {
      await this.contactsService.deleteContact(docId);
      console.log('Kontakt erfolgreich gelöscht');
    } catch (error) {
      console.error('Fehler beim Löschen des Kontakts:', error);
    }
  }
}

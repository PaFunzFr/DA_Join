import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
import { ContactsService } from '../../services/contacts.service';
import { ContactInterface } from '../../interfaces/contact.interface';
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { SignalsService } from '../../services/signals.service';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ContactDialogComponent, CommonModule, ContactInfoComponent],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})

export class ContactsComponent {
  contactsService = inject(ContactsService);
  signalService = inject(SignalsService)
  showDialog = false;
  showBtnMenu = false;
  toastVisible = false;
  showToast = false;
  sortedContacts: ContactInterface[] = [];
  firstLetters: string[] = [];
  activeContactIndex: number | null = null;
  contactClicked: boolean = false;
  editName: string | undefined;
  editMail: string | undefined;
  editPhone: string | undefined;
  btnDelete: boolean = false;
  btnEdit: boolean = false;

  ngOnInit() {
    this.signalService.checkScreenSize();
    this.groupContactsByFirstLetter();
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    this.signalService.checkScreenSize();
  }

  toggleDialog() {
    this.showDialog = !this.showDialog;
  }

  onContactCreated() {
    this.showToast = true;
    setTimeout(() => this.toastVisible = true, 10);
    setTimeout(() => this.toastVisible = false, 2000);
    setTimeout(() => this.showToast = false, 2500);
    this.showDialog = false;
  }


  groupContactsByFirstLetter() {
    this.firstLetters = [...new Set(this.contactsService.contacts.map(contact => contact.name.charAt(0).toUpperCase()))];
    return this.firstLetters;
  }

  showContactInfo(index: number | null) {
    if (this.activeContactIndex === index && this.contactClicked && this.activeContactIndex !== null) {
      this.contactClicked = false;
    } else {
      this.activeContactIndex = index;
      this.contactClicked = true;
    }
  }

  handleStatusDialog(event: boolean): void {
    this.showDialog = event;
  }

  handleContactData(data: { name: string; mail: string; phone: string }) {
    this.editName = data.name;
    this.editMail = data.mail;
    this.editPhone = data.phone;
  }

  newContact() {
    this.showDialog = true;
    this.editName = undefined;
    this.editMail = undefined;
    this.editPhone = undefined;
  }

  lastInitial(index: number): string {
    const contact = index != null ? this.contactsService.contacts[index] : null;
    if (!contact || !contact.name) return '';
    const parts = contact.name.trim().split(' ');
    const lastWord = parts.at(-1) || '';
    return lastWord.charAt(0).toUpperCase();
  }

  showInfos() {
    console.log(this.signalService.isInfoShown);
    this.signalService.isInfoShown = true;
  }

  editContact(index: number) {
    this.showDialog =true;
    const contact = this.contactsService.contacts[index];
    this.editName = contact.name;
    this.editMail = contact.mail;
    this.editPhone = contact.phone;
  }

  deleteContact() {

  }

  toggleBtnMenu() {
    this.showBtnMenu = !this.showBtnMenu;
  }

}

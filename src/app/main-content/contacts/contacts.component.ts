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
  toastMessage: string = '';
  toastType: 'create' | 'update' | 'delete' | 'error' = 'create';
  sortedContacts: ContactInterface[] = [];
  firstLetters: string[] = [];
  activeContactIndex: number | null = null;
  contactClicked: boolean = false;
  editId: string | undefined;
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
    this.toastMessage = 'Contact successfully created';
    this.toastType = 'create';
    this.triggerToast();
  }

  onContactUpdated() {
    this.toastMessage = 'Changes saved';
    this.toastType = 'update';
    this.triggerToast();
  }

  onContactDeleted() {
    this.toastMessage = 'Contact deleted';
    this.toastType = 'delete';
    this.triggerToast();
  }


  triggerToast() {
    this.showToast = true;
    setTimeout(() => this.toastVisible = true, 10);
    setTimeout(() => this.toastVisible = false, 2000);
    setTimeout(() => this.showToast = false, 2500);
  }

  onContactError() {
    this.showDialog = false;
    this.toastMessage = 'Something went wrong';
    this.toastType = 'error';
    this.triggerToast();
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

  handleContactData(data: { id: string, name: string; mail: string; phone: string }) {
    this.editId = data.id;
    this.editName = data.name;
    this.editMail = data.mail;
    this.editPhone = data.phone;
  }

  handleEditIndex(event: any) {
    this.activeContactIndex = event;
  }

  handleCloseContactInfo(event: boolean): void {
    this.contactClicked = !event;
  }

  newContact() {
    this.contactClicked = false;
    this.activeContactIndex = null;
    this.showDialog = true;
    this.editName = undefined;
    this.editMail = undefined;
    this.editPhone = undefined;
  }

  showInfos() {
    console.log(this.signalService.isInfoShown);
    this.signalService.isInfoShown.set(true);
  }

  editContact(index: number) {
    this.showDialog = true;
    const contact = this.contactsService.contacts[index];
    this.editName = contact.name;
    this.editMail = contact.mail;
    this.editPhone = contact.phone;
  }

  async deleteContact(index: number) {
    const contactId = this.contactsService.contacts[index].id;
    if (contactId) {
      try {
        await this.contactsService.deleteContact(contactId);
        this.onContactDeleted();
        this.closeContactInfo();
        this.showBtnMenu = false;
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  }

  toggleBtnMenu() {
    this.showBtnMenu = !this.showBtnMenu;
  }

  closeContactInfo() {
    this.signalService.isInfoShown.set(false);
    this.contactClicked = false;
  }

}

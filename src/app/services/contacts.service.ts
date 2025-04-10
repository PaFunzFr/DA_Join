import { Injectable, inject, OnDestroy } from '@angular/core';
import { ContactInterface } from '../interfaces/contact.interface';
import {
  Firestore,
  collection,
  doc,
  onSnapshot,
  collectionData,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentReference,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ContactsService implements OnDestroy {
  firestore: Firestore = inject(Firestore);
  contacts: ContactInterface[] = [];
  // contact = {name: "Hans Meier", mail: "h.meier@blauerhimmel.de", phone: "+49 1652 9876543"}
  unsubscribeContact;

  constructor() {
    // this.addContact(this.contact);
    this.unsubscribeContact = this.subContactsList();
  } // constructor end

  ngOnDestroy() {
    if (this.unsubscribeContact) {
      this.unsubscribeContact();
    }
  }

  async addContact(
    contact: ContactInterface
  ): Promise<void | DocumentReference> {
    try {
      const contactRef = await addDoc(this.getContactsRef(), contact);
      // console.log('Document written with ID: ', contactRef.id);
      return contactRef;
    } catch (err) {
      console.error(err);
    }
  }

  async updateContact(contact: ContactInterface) {
    if (contact.id) {
      try {
        let docRef = this.getSingleDocRef(contact.id);
        await updateDoc(docRef, this.getCleanJson(contact));
      } catch (err) {
        console.error(err);
      }
    }
  }

  async deleteContact(docId: string) {
    try {
      await deleteDoc(this.getSingleDocRef(docId));
    } catch (err) {
      console.error(err);
    }
  }

  getCleanJson(contact: ContactInterface) {
    return {
      name: contact.name,
      phone: contact.phone,
      mail: contact.mail,
    };
  }

  subContactsList() {
    const q = query(this.getContactsRef(), orderBy('name'));
    return onSnapshot(
      q,
      (snapshot) => {
        snapshot.forEach((element) => {
          const contact = element.data();
          this.contacts.push(this.setContactObject(contact));
          console.log(this.contacts);
        });
      },
      (error) => {
        console.error('Firestore Error', error.message);
      }
    );
  }

  setContactObject(obj: any): ContactInterface {
    return {
      name: obj.name || '',
      phone: obj.phone || '',
      mail: obj.mail || '',
    };
  }

  getContactsRef() {
    return collection(this.firestore, 'contacts');
  }

  getSingleDocRef(docId: string) {
    return doc(collection(this.firestore, 'contacts'), docId);
  }
}

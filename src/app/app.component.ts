import { Component } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ang-fire';
  userData!: Observable<any>;

  constructor(private firestore: Firestore) {
    this.getData();
  }

  addData(f: any) {
    console.log(f.value);
    const collectionInstance = collection(this.firestore, 'users'); //users is the collection name
    addDoc(collectionInstance, f.value).then(() => {
      console.log('data saved successfully');
    })
      .catch((err) => {
        console.log(err);
      })
  }

  getData() {
    const collectionInstance = collection(this.firestore, 'users');
    collectionData(collectionInstance, { idField: 'id' }).subscribe(val => {
      console.log(val);
    })

    this.userData = collectionData(collectionInstance, { idField: 'id' });  // no need to use snapshot changes or value changes
  }

  updateData(id: string) {
    const docInstance = doc(this.firestore, 'users', id);
    const updateData = {
      name: 'updatedName'
    }

    updateDoc(docInstance, updateData)
      .then(() => {
        console.log('Data updated');
      })
      .catch((err) => {
        console.log(err);
      })
  }

  deleteData(id: string) {
    const docInstance = doc(this.firestore, 'users', id);
    deleteDoc(docInstance)
      .then(() => {
        console.log('Data deleted');
      })
  }
}

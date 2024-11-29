import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';

export async function fetchCollection(collectionName) {
  try {
    const data = await getDocs(collection(db, collectionName));
    return data.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function fetchExistingTags(collectionName) {
  try {
    const data = await getDocs(collection(db, collectionName));
    const tags = data.docs.flatMap(doc => {
      const docData = doc.data();
      console.log(docData); 
      console.log(docData.tags); 

      if (docData.tags === undefined) {
        console.warn(`Document ${doc.id} does not have a tags field`);
        return [];
      }
      if (Array.isArray(docData.tags)) {
        return docData.tags;
      } else {
        console.warn(`Document ${doc.id} does not have a valid tags array`);
        return [];
      }
    });
    return [...new Set(tags)]; // Remove duplicates
  } catch (err) {
    console.error('Error fetching existing tags:', err);
    return [];
  }
}

export async function addDocument(collectionName, document) {
  try {
    await addDoc(collection(db, collectionName), document);
  } catch (err) {
    console.error(err);
  }
}

export async function updateDocument(collectionName, id, document) {
  try {
    await updateDoc(doc(db, collectionName, id), document);
  } catch (err) {
    console.error(err);
  }
}

export async function deleteDocument(collectionName, id) {
  try {
    await deleteDoc(doc(db, collectionName, id));
  } catch (err) {
    console.error(err);
  }
}
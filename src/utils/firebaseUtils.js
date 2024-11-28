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
    const tags = data.docs.flatMap(doc => doc.data().tags || []);
    return [...new Set(tags)]; // Remove duplicates
  } catch (err) {
    console.error(err);
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
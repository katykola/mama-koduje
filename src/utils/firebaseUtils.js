import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../config/firebase'; // Import the auth object

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
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User is not authenticated');
    }

    const documentWithUserId = {
      ...document,
      userId: user.uid, // Ensure the userId field matches the authenticated user's UID
    };

    await addDoc(collection(db, collectionName), documentWithUserId);
  } catch (err) {
    console.error(err);
  }
}

export async function updateDocument(collectionName, id, document) {
  try {
    const user = auth.currentUser;
    console.log( 'UID:', user.uid);
    if (!user) {
      throw new Error('User is not authenticated');
    }

    const documentWithUserId = {
      ...document,
      userId: user.uid, // Ensure the userId field matches the authenticated user's UID
    };
    console.log('userId:', documentWithUserId.userId);

    await updateDoc(doc(db, collectionName, id), documentWithUserId);
  } catch (err) {
    console.error(err);
  }
}

export async function deleteDocument(collectionName, id) {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('User is not authenticated');
    }

    await deleteDoc(doc(db, collectionName, id));
  } catch (err) {
    console.error(err);
  }
}
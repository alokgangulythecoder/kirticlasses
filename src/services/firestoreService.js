import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";

// Collections used: "quizzes", "tutorials", "workbooks", "practiceTests"
// Each document generally has: { classLevel, subject, title, url/questions, createdAt }

export function subscribeToCollection(collectionName, classLevel, callback) {
  const colRef = collection(db, collectionName);
  const q = classLevel
    ? query(colRef, where("classLevel", "==", classLevel))
    : colRef;

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const items = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
      callback(items, null);
    },
    (error) => {
      callback([], error);
    }
  );
  return unsubscribe;
}

export async function addItem(collectionName, data) {
  return addDoc(collection(db, collectionName), {
    ...data,
    createdAt: Date.now(),
  });
}

export async function updateItem(collectionName, id, data) {
  return updateDoc(doc(db, collectionName, id), data);
}

export async function deleteItem(collectionName, id) {
  return deleteDoc(doc(db, collectionName, id));
}

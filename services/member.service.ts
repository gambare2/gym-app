import {
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    doc,
    updateDoc,
    Timestamp,
  } from "firebase/firestore";
  import { db } from "@/services/firebase";
  
  const membersRef = collection(db, "members");
  
  export async function getMembers() {
    const snap = await getDocs(membersRef);
    return snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
  
  export async function addMember(data: any) {
    const joinDate = new Date();
  
    // 🔥 Next due date = join date + 1 month
    const nextDueDate = new Date(joinDate);
    nextDueDate.setMonth(nextDueDate.getMonth() + 1);
  
    return addDoc(membersRef, {
      ...data,
      joinedAt: Timestamp.fromDate(joinDate),
      nextDueDate: Timestamp.fromDate(nextDueDate),
      lastPaidMonth: null,
    });
  }
  
  export async function updateMember(id: string, data: any) {
    return updateDoc(doc(db, "members", id), data);
  }
  
  export async function deleteMember(id: string) {
    return deleteDoc(doc(db, "members", id));
  }
  
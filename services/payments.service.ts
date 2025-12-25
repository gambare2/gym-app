import {
    collection,
    addDoc,
    updateDoc,
    doc,
    Timestamp,
    getDocs,
    query,
    where,
    orderBy
  } from "firebase/firestore";
  import { db } from "@/services/firebase";
  import type { Member } from "@/types/member";
  
  export async function markPaymentPaid(member: Member) {
    if (!member.nextDueDate) {
      throw new Error("Member has no due date");
    }
  
    const dueDate = member.nextDueDate.toDate();
  
    // 🔑 PAYMENT CYCLE MUST COME FROM DUE DATE
    const paidMonth = dueDate.toISOString().slice(0, 7);
  
    // 1️⃣ Save payment history
    await addDoc(collection(db, "payments"), {
      memberId: member.id,
      memberName: member.name,
      amount: member.monthlyFee ?? 0,
      month: paidMonth,
      paidAt: Timestamp.now(),
    });
  
    // 2️⃣ Move next due date forward by 1 month
    const nextDue = new Date(dueDate);
    nextDue.setMonth(nextDue.getMonth() + 1);
  
    // 3️⃣ Update member document
    await updateDoc(doc(db, "members", member.id), {
      lastPaidMonth: paidMonth,
      nextDueDate: Timestamp.fromDate(nextDue),
    });
  }
  
  export async function getPaymentHistory(memberId: string) {
    const q = query(
      collection(db, "payments"),
      where("memberId", "==", memberId),
      orderBy("paidAt", "desc")
    );
  
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  }
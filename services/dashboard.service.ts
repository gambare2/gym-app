import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/services/firebase";

export async function getDashboardStats() {
  // Total members
  const membersSnap = await getDocs(collection(db, "members"));
  const totalMembers = membersSnap.size;

  // Active members
  const activeQuery = query(
    collection(db, "members"),
    where("status", "==", "active")
  );
  const activeSnap = await getDocs(activeQuery);
  const activeMembers = activeSnap.size;

  // Due payments
  const today = new Date();
  const dueQuery = query(
    collection(db, "members"),
    where("nextDueDate", "<=", today)
  );
  const dueSnap = await getDocs(dueQuery);
  const duePayments = dueSnap.size;

  // Monthly revenue
  const paymentsSnap = await getDocs(collection(db, "payments"));
  let revenue = 0;
  paymentsSnap.forEach((doc) => {
    revenue += doc.data().amount || 0;
  });

  return {
    totalMembers,
    activeMembers,
    duePayments,
    revenue,
  };
}

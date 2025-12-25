import { Timestamp } from "firebase/firestore";

export interface Member {
  id: string;
  name: string;
  phone?: string;
  status?: string;
  monthlyFee?: number;
  nextDueDate?: Timestamp;
  lastPaidMonth?: string;
  joinedAt?: Timestamp;
}

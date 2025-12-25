export default function getWhatsAppMessage(member: any, lateFee = 0) {
    const dueDate = member.nextDueDate.toDate().toDateString();
    const total = member.monthlyFee + lateFee;
  
    const imageUrl =
      "https://yourdomain.com/upi-qr.jpg";
  
    return `Hi ${member.name} 👋
  
  🏋️ *Gym Fee Reminder*
  
  Your gym fee details:
  • Monthly Fee: ₹${member.monthlyFee}
  • Late Fee: ₹${lateFee}
  • Total: ₹${total}
  
  📅 Due Date: ${dueDate}
  
  📸 Payment QR:
  ${imageUrl}
  
  Please pay to continue uninterrupted workouts 💪
  Thank you!`;
  }
  
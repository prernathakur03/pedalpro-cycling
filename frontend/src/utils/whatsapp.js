export function createWhatsAppLink({ phone, customerName, cycleType, quantity, durationHours, date, time, estimatedPrice }) {
  const cleanPhone = (phone || '919920455722').replace(/[^0-9]/g, '');
  
  let msg = `Hi PedalPro Cycling, I would like to enquire about renting:\n`;
  msg += `• Cycle: ${cycleType || 'Cycle'}\n`;
  msg += `• Quantity: ${quantity || 1}\n`;
  msg += `• Duration: ${durationHours || 1} hour(s)\n`;
  if (date) msg += `• Date: ${date}\n`;
  if (time) msg += `• Time: ${time}\n`;
  msg += `• Estimated Total: ₹${estimatedPrice || 0}\n`;
  if (customerName) msg += `• Name: ${customerName}\n`;
  msg += `\nPlease confirm availability.`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
}
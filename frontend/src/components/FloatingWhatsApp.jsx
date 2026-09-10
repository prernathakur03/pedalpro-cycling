import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { createWhatsAppLink } from '../utils/whatsapp';

export default function FloatingWhatsApp() {
  const { settings } = useSettings();
  const link = createWhatsAppLink({ phone: settings.whatsapp_number });

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact PedalPro on WhatsApp"
      className="fixed bottom-6 left-6 z-40 bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition transform hover:scale-110"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
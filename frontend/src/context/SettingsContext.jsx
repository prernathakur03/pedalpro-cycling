import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../services/api';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState({
    business_name: 'PedalPro Cycling',
    phone: '+919920455722',
    whatsapp_number: '919920455722',
    email: 'pentabhavesh@gmail.com',
    address: 'Worli Seaface, Mumbai',
    opening_time: '5:00 AM',
    closing_time: '1:00 AM',
    maps_url: 'https://maps.google.com/?q=Worli+Seaface+Mumbai'
  });
  const [cycles, setCycles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPublicData = async () => {
    try {
      const [sRes, cRes] = await Promise.all([
        api.get('/settings'),
        api.get('/cycles')
      ]);
      if (sRes.data && sRes.data.business_name) setSettings(sRes.data);
      if (cRes.data) setCycles(cRes.data);
    } catch (err) {
      console.error('Error fetching settings/cycles:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicData();
  }, []);

  return (
    <SettingsContext.Provider value={{ settings, cycles, loading, refreshData: fetchPublicData }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
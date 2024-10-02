import { useContext } from 'react';
import { InformasiContext } from '../context/InformasiContext';

export const useLocationContext = () => {
  const context = useContext(InformasiContext);
  if (!context) {
    throw new Error('useLocationContext must be used within an AppProvider');
  }

  return context;
};
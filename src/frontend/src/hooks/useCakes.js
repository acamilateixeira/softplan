import { useContext } from 'react';
import { CakeContext } from '../contexts/CakeContext';

const useCakes = () => {
  const context = useContext(CakeContext);
  if (!context) {
    throw new Error('useCakes deve ser usado dentro de <CakeProvider>');
  }
  return context;
};

export default useCakes;

import { createContext, useEffect, useState } from 'react';
import { getCakes, createCake, deleteCake, updateCake as updateCakeService } from '../services/cakeService';

export const CakeContext = createContext();

export const CakeProvider = ({ children }) => {
  const [cakes, setCakes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCakes = async () => {
    try {
      setLoading(true);
      const data = await getCakes();
      setCakes(data);
    } finally {
      setLoading(false);
    }
  };

  const addCake = async (cakeData) => {
    const newCake = await createCake(cakeData);
    setCakes((prev) => [newCake, ...prev]);
  };

  const removeCake = async (id) => {
    await deleteCake(id);
    setCakes((prev) => prev.filter((cake) => cake.id !== id));
  };

  const updateCake = async (id, data) => {
    const updated = await updateCakeService(id, data);
    setCakes((prev) =>
      prev.map((cake) => (cake.id === id ? updated : cake))
    );
  };
  
  useEffect(() => {
    fetchCakes();
  }, []);

  return (
    <CakeContext.Provider value={{ cakes, loading, addCake, removeCake, updateCake }}>
        {children}
    </CakeContext.Provider>
  );
};

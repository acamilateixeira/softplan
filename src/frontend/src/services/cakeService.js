import client from '../api/client';

export const getCakes = async () => {
  const response = await client.get('/cakes');
  return response.data.data;
};

export const createCake = async (data) => {
  const response = await client.post('/cakes', data);
  return response.data;
};

export const deleteCake = async (id) => {
    await client.delete(`/cakes/${id}`);
  };
  
export const updateCake = async (id, data) => {
    const response = await client.put(`/cakes/${id}`, data);
    return response.data;
};
  
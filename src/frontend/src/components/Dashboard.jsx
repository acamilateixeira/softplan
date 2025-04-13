import React, { useEffect, useState } from 'react';
import { Typography, Box, Paper } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import client from '../api/client';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    client.get('/cakes/summary')
      .then(res => setSummary(res.data))
      .catch(err => console.error('Erro ao carregar dashboard', err));
  }, []);

  if (!summary) return null;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Dashboard de Bolos 🎯
      </Typography>

      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography>Total de bolos: {summary.total_cakes}</Typography>
        <Typography>Quantidade total disponível: {summary.total_quantity}</Typography>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>Quantidade por Bolo</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={summary.by_cake}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="#1976d2" name="Quantidade" />
            <Bar dataKey="interested" fill="#f50057" name="Interessados" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
};

export default Dashboard;

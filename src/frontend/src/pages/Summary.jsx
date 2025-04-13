import React, { useEffect, useState } from 'react';
import {
  Card, CardContent, Typography, Grid, CircularProgress, Box, Paper
} from '@mui/material';
import client from '../api/client';

const Summary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.get('/cakes/summary')
      .then(res => setSummary(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Resumo Geral</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Total de Bolos</Typography>
              <Typography variant="h4">{summary.total_cakes}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="subtitle1">Total em Estoque</Typography>
              <Typography variant="h4">{summary.total_quantity}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>Bolos com Interessados</Typography>
            <Grid container spacing={2}>
              {summary.by_cake.map((cake, index) => (
                <Grid item xs={12} md={6} lg={4} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6">{cake.name}</Typography>
                      <Typography variant="body2">Quantidade: {cake.quantity}</Typography>
                      <Typography variant="body2">Interessados: {cake.interested}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Summary;

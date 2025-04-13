import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Typography, IconButton,
  CircularProgress, Button, Box, Tooltip
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon
} from '@mui/icons-material';

import { useSnackbar } from '../contexts/SnackbarContext';
import useCakes from '../hooks/useCakes';
import CakeModal from './CakeModal';

const CakeList = () => {
  const { cakes, loading, removeCake, updateCake, addCake } = useCakes();
  const { showSnackbar } = useSnackbar();

  const [selectedCake, setSelectedCake] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');

  const handleNewCake = () => {
    setSelectedCake(null);
    setModalMode('create');
    setModalOpen(true);
  };

  const handleEditClick = (cake) => {
    setSelectedCake(cake);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleDeleteClick = (cake) => {
    setSelectedCake(cake);
    setModalMode('delete');
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedCake(null);
    setModalOpen(false);
  };

  const handleModalSubmit = async (data) => {
    try {
      if (modalMode === 'edit') {
        await updateCake(selectedCake.id, data);
        showSnackbar('Bolo atualizado com sucesso!');
      } else if (modalMode === 'delete') {
        await removeCake(selectedCake.id);
        showSnackbar('Bolo excluído com sucesso!');
      } else {
        await addCake(data);
        showSnackbar('Bolo criado com sucesso!');
      }
    } catch (err) {
      showSnackbar('Erro ao processar a ação!', 'error');
    }

    handleModalClose();
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h6">Lista de Bolos</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleNewCake}>
          Novo Bolo
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: 'primary.dark' }}>
            <TableRow>
              <TableCell sx={{ color: '#fff' }}>Nome</TableCell>
              <TableCell align="center" sx={{ color: '#fff' }}>Peso (g)</TableCell>
              <TableCell align="center" sx={{ color: '#fff' }}>Valor (R$)</TableCell>
              <TableCell align="center" sx={{ color: '#fff' }}>Qtd</TableCell>
              <TableCell sx={{ color: '#fff' }}>Interessados</TableCell>
              <TableCell align="right" sx={{ color: '#fff' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cakes.map((cake, index) => (
              <TableRow
                key={cake.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? 'background.default' : 'action.hover',
                  transition: 'background 0.3s',
                  '&:hover': { backgroundColor: 'action.selected' }
                }}
              >
                <TableCell>{cake.name}</TableCell>
                <TableCell align="center">{cake.weight}</TableCell>
                <TableCell align="center">
                  {new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(cake.price)}
                </TableCell>
                <TableCell align="center">{cake.quantity}</TableCell>
                <TableCell sx={{ minWidth: 150 }}>
                  {cake.interested_emails?.length > 0
                    ? cake.interested_emails.join(', ')
                    : 'Nenhum'}
                </TableCell>
                <TableCell align="right">
                  <Box display="flex" justifyContent="flex-end" gap={1}>
                    <Tooltip title="Editar" arrow>
                      <IconButton onClick={() => handleEditClick(cake)} color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Excluir" arrow>
                      <IconButton onClick={() => handleDeleteClick(cake)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CakeModal
        open={modalOpen}
        mode={modalMode}
        initialData={selectedCake}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
      />
    </>
  );
};

export default CakeList;

import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Stack, TextField, Typography, IconButton
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { NumericFormat } from 'react-number-format';

const CakeModal = ({
  open,
  mode = 'create', // 'create' | 'edit' | 'delete'
  initialData = {},
  onClose,
  onSubmit
}) => {
  const [form, setForm] = useState({
    name: '',
    weight: '',
    price: '',
    quantity: '',
    emails: ['']
  });

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setForm({
        ...initialData,
        emails: initialData.emails || ['']
      });
    } else if (mode === 'create') {
      setForm({
        name: '',
        weight: '',
        price: '',
        quantity: '',
        emails: ['']
      });
    }
  }, [mode, initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEmailChange = (index, value) => {
    const updatedEmails = [...form.emails];
    updatedEmails[index] = value;
    setForm({ ...form, emails: updatedEmails });
  };

  const addEmailField = () => {
    setForm({ ...form, emails: [...form.emails, ''] });
  };

  const removeEmailField = (index) => {
    const updatedEmails = form.emails.filter((_, i) => i !== index);
    setForm({ ...form, emails: updatedEmails });
  };

  const handleSubmit = () => {
    const payload = {
      ...form,
      weight: parseInt(form.weight),
      price: parseFloat(form.price?.replace(',', '.').replace('R$', '').trim()),
      quantity: parseInt(form.quantity),
    };
    onSubmit(payload);
  };

  if (mode === 'delete') {
    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          Tem certeza que deseja excluir "{initialData?.name}"?
        </DialogTitle>
        <DialogActions>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={onSubmit} color="error">Excluir</Button>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{mode === 'edit' ? 'Editar Bolo' : 'Cadastrar Bolo'}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField label="Nome" name="name" value={form.name} onChange={handleChange} fullWidth required />
          <TextField label="Peso (g)" name="weight" value={form.weight} onChange={handleChange} type="number" fullWidth required />
          <NumericFormat
            label="Valor (R$)"
            name="price"
            value={form.price}
            onValueChange={({ formattedValue }) => setForm({ ...form, price: formattedValue })}
            customInput={TextField}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            fullWidth
            required
          />
          <TextField label="Quantidade" name="quantity" value={form.quantity} onChange={handleChange} type="number" fullWidth required />
          <Typography variant="subtitle1">E-mails de interessados:</Typography>
          {form.emails.map((email, index) => (
            <Stack direction="row" spacing={1} alignItems="center" key={index}>
              <TextField
                label={`Email ${index + 1}`}
                value={email}
                onChange={(e) => handleEmailChange(index, e.target.value)}
                fullWidth
                type="email"
              />
              <IconButton onClick={() => removeEmailField(index)} disabled={form.emails.length === 1}>
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}
          <Button startIcon={<AddIcon />} onClick={addEmailField}>
            Adicionar E-mail
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained">
          {mode === 'edit' ? 'Salvar' : 'Cadastrar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CakeModal;

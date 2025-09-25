import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

const formStyle = { padding: '16px', maxWidth: '500px', margin: 'auto' };

function ExpenseForm({ handleAddExpense, setShowForm }) {
  const [newExpense, setNewExpense] = useState({ description: '', category: 'Alimentação', amount: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExpense({ ...newExpense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newExpense.description || !newExpense.amount) return;
    handleAddExpense({ ...newExpense, amount: parseFloat(newExpense.amount) });
    setNewExpense({ description: '', category: 'Alimentação', amount: '' });
  };

  return (
    <Paper elevation={3} style={formStyle}>
      <Typography variant="h6" gutterBottom>Adicionar Nova Despesa</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField fullWidth label="Descrição" name="description" value={newExpense.description} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Categoria</InputLabel>
              <Select name="category" value={newExpense.category} label="Categoria" onChange={handleInputChange}>
                <MenuItem value="Alimentação">Alimentação</MenuItem>
                <MenuItem value="Moradia">Moradia</MenuItem>
                <MenuItem value="Transporte">Transporte</MenuItem>
                <MenuItem value="Lazer">Lazer</MenuItem>
                <MenuItem value="Outros">Outros</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Valor (R$)" name="amount" type="number" value={newExpense.amount} onChange={handleInputChange} />
          </Grid>
          <Grid item xs={12} style={{ marginTop: '16px' }}>
            <Button type="submit" variant="contained" color="primary" style={{ marginRight: '8px' }}>Adicionar</Button>
            <Button onClick={() => setShowForm(false)}>Cancelar</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

export default ExpenseForm;
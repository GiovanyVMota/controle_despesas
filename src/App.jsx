// src/App.jsx (versão simplificada e correta)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ExpenseForm from './components/ExpenseForm.jsx';
import ExpenseTable from './components/ExpenseTable.jsx';
import { CssBaseline, Container, Typography, AppBar, Toolbar } from '@mui/material';
import API_URL from '../config.js';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${API_URL}/despesas`);
      setExpenses(response.data.sort((a, b) => b.id - a.id));
    } catch (error) {
      console.error("Erro ao buscar despesas:", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleAddExpense = async (newExpense) => {
    try {
      await axios.post(`${API_URL}/despesas`, newExpense);
      fetchExpenses();
      setShowForm(false);
    } catch (error) {
      console.error("Erro ao adicionar despesa:", error);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      await axios.delete(`${API_URL}/despesas/${expenseId}`);
      fetchExpenses();
    } catch (error) {
      console.error("Erro ao deletar despesa:", error);
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Controle de Despesas</Typography>
        </Toolbar>
      </AppBar>

      {/* Com o CSS global correto, o Container se centraliza sozinho */}
      <Container maxWidth="md" sx={{ marginTop: '40px' }}>
        {showForm ? (
          <ExpenseForm handleAddExpense={handleAddExpense} setShowForm={setShowForm} />
        ) : (
          <ExpenseTable expenses={expenses} handleDeleteExpense={handleDeleteExpense} setShowForm={setShowForm} />
        )}
      </Container>
    </>
  );
}

export default App;
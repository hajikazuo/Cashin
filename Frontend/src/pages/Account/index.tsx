import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { useAuth } from "../../hooks/auth";

type Props = {
  type: 'signin' | 'signup'
}

export const Auth = ({ type }: Props) => {
  const [nameInput, setNameInput] = useState('')
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showAlert, setShowAlert] = useState<{
    type: 'error',
    message: string,
    show: boolean
  }>({
    type: 'error',
    message: '',
    show: false
  });


  const { handleSignIn, handleSignUp } = useAuth();
  const navigate = useNavigate();

  const handleOnClick = async () => {
    const [name, email, password] = [nameInput, emailInput, passwordInput]

    if ((type == 'signup' && !name) || !email || !password) {
      setShowAlert({ type: 'error', message: 'Preencha todos os campos!', show: true });
      return;
    }

    const request = await (type == 'signin' ? handleSignIn({ email, password }) : handleSignUp({ name, email, password }))

    if (request !== true) {
      setShowAlert({ type: 'error', message: request, show: true });
      return;
    }

    navigate('/');
  }

  useEffect(() => {
    setShowAlert({ type: 'error', message: '', show: false });
  }, [type]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh'
      }}
    >
      <Container component="main" maxWidth="xs">
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h5" align="center" gutterBottom>
            {type === 'signin' ? 'Entre na sua conta' : 'Criar uma conta'}
          </Typography>

          {showAlert.show && (
            <Alert severity={showAlert.type} sx={{ mt: 2, mb: 2 }}>
              {showAlert.message}
            </Alert>
          )}

          <Box component="form" sx={{ mt: 2 }}>
            {type == 'signup' &&
              <TextField
                label="Nome"
                name="name"
                fullWidth
                margin="normal"
                variant="outlined"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                required
              />
            }

            <TextField
              label="E-mail"
              name="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              required
            />

            <TextField
              label="Senha"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              variant="outlined"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              required
            />

            <Button
              onClick={handleOnClick}
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              {type === 'signin' ? 'Login' : 'Registrar-se'}
            </Button>

            <Box sx={{ mt: 2, textAlign: 'center' }}>
              {type === 'signin' ? (
                <Link to='/signup'>Não tem conta? Registrar-se</Link>
              ) : (
                <Link to='/signin'>Já tem conta? Login</Link>
              )}
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

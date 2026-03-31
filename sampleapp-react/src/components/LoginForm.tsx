import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, Button, Alert } from '@mui/material';
import { LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { FormInput } from './FormInput';

type FormData = {
  login: string;
  password: string;
};

export const LoginForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { login } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      login: '',
      password: '',
    },
  });

  const validateLogin = (value: string) => {
    if (!value) return 'Логин обязателен';
    return true;
  };

  const validatePassword = (value: string) => {
    if (!value) return 'Пароль обязателен';
    if (value.length < 3) return 'Минимум 3 символа';
    return true;
  };

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setError('');
      await login(data.login, data.password);
      onSuccess?.();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка входа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {error && <Alert severity="error">{error}</Alert>}

        <Controller
          name="login"
          control={control}
          rules={{ validate: validateLogin }}
          render={({ field }) => (
            <FormInput
              label="Логин"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.login?.message}
              touched={touchedFields.login}
              required
              disabled={loading}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          rules={{ validate: validatePassword }}
          render={({ field }) => (
            <FormInput
              label="Пароль"
              type="password"
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.password?.message}
              touched={touchedFields.password}
              required
              disabled={loading}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          startIcon={<LogIn size={20} />}
          disabled={!isValid || loading}
        >
          {loading ? 'Вход...' : 'Войти'}
        </Button>
      </Box>
    </form>
  );
};
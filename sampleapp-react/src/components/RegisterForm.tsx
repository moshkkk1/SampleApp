import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Alert, TextField } from '@mui/material';
import { UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { PasswordStrength } from './PasswordStrength';
import { FormDebug } from './FormDebug';
import { validateLogin, validatePassword, validateName } from '../utils/validators';

type FormData = {
  login: string;
  password: string;
  name: string;
};

export const RegisterForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { register: registerUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [showDebug, setShowDebug] = useState(import.meta.env.DEV);
  
  const { register, handleSubmit, watch, formState, setError, clearErrors } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      login: '',
      password: '',
      name: '',
    },
  });

  const { errors, touchedFields, isValid, isDirty } = formState;
  const loginValue = watch('login');
  const passwordValue = watch('password');

  useEffect(() => {
    if (loginValue && loginValue !== 'admin') {
      clearErrors('login');
    }
  }, [loginValue, clearErrors]);

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      setServerError('');
      console.log('Form data:', data);
      await registerUser(data.login, data.password);
      onSuccess?.();
    } catch (err: any) {
      console.error('Registration error:', err);
      const errors = err.response?.data?.errors;
      if (errors) {
        if (errors.Login) {
          setError('login', { type: 'manual', message: errors.Login[0] });
        }
        if (errors.Password) {
          setError('password', { type: 'manual', message: errors.Password[0] });
        }
        setServerError('Проверьте правильность заполнения полей');
      } else {
        setServerError(err.response?.data?.message || 'Ошибка регистрации');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {serverError && <Alert severity="error">{serverError}</Alert>}

        <TextField
          label="Имя"
          {...register('name', { 
            validate: validateName
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
          disabled={loading}
          fullWidth
        />

        <TextField
          label="Логин"
          {...register('login', { 
            validate: validateLogin
          })}
          error={!!errors.login}
          helperText={errors.login?.message}
          required
          disabled={loading}
          fullWidth
        />

        {loginValue === 'admin' && touchedFields.login && !errors.login && (
          <Alert severity="warning" sx={{ mt: -1 }}>
            Недопустимый логин пользователя!
          </Alert>
        )}

        <TextField
          label="Пароль"
          type="password"
          {...register('password', { 
            validate: validatePassword
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
          required
          disabled={loading}
          fullWidth
        />

        <PasswordStrength password={passwordValue} />

        {isDirty && (
          <Alert severity="info" sx={{ mt: 1 }}>
            ✏️ У вас есть несохраненные изменения
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          startIcon={<UserPlus size={20} />}
          disabled={!isValid || loading}
          sx={{ mt: 1 }}
        >
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </Button>

        {import.meta.env.DEV && (
          <Button variant="text" size="small" onClick={() => setShowDebug(!showDebug)}>
            {showDebug ? 'Скрыть отладку' : 'Показать отладку'}
          </Button>
        )}

        {showDebug && (
          <FormDebug
            values={watch()}
            errors={errors}
            touched={touchedFields}
            isValid={isValid}
            isDirty={isDirty}
          />
        )}
      </Box>
    </form>
  );
};
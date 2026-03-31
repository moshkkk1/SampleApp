import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import { Eye, EyeOff } from 'lucide-react';

type FormInputProps = {
  label: string;
  name?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  touched?: boolean;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
} & Omit<React.ComponentProps<typeof TextField>, 'value' | 'onChange' | 'onBlur'>;

export const FormInput = React.forwardRef<HTMLDivElement, FormInputProps>(
  (props, ref) => {
    const {
      label,
      name,
      type = 'text',
      required,
      disabled,
      error,
      touched,
      value,
      onChange,
      onBlur,
      ...rest
    } = props;

    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    const fieldType = isPassword ? (showPassword ? 'text' : 'password') : type;

    const endAdornment = isPassword ? (
      <InputAdornment position="end">
        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </IconButton>
      </InputAdornment>
    ) : null;

    return (
      <TextField
        ref={ref}
        fullWidth
        label={label}
        name={name}
        type={fieldType}
        value={value ?? ''}
        onChange={onChange}
        onBlur={onBlur}
        error={touched && !!error}
        helperText={touched && error}
        required={required}
        disabled={disabled}
        InputProps={endAdornment ? { endAdornment } : undefined}
        {...rest}
      />
    );
  }
);

FormInput.displayName = 'FormInput';
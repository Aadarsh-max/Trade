import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Input from '../../../components/common/Input';
import Button from '../../../components/common/Button';
import ErrorText from '../../../components/common/ErrorText';
import { useAuth } from '../hooks/useAuth';

const LoginForm = () => {
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const errors = {};
    if (!formData.email.includes('@')) errors.email = 'Enter a valid email';
    if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await login(formData);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      onSubmit={handleSubmit}
      className="w-full max-w-sm"
    >
      <h1 className="mb-1 text-2xl font-semibold tracking-tight text-textprimary">Welcome back</h1>
      <p className="mb-8 text-sm text-textsecondary">Log in to continue trading</p>

      <div className="mb-4">
        <div className="relative">
          <Mail size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-textmuted" />
          <Input
            type="email"
            placeholder="you@example.com"
            className="pl-10"
            error={fieldErrors.email}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <ErrorText>{fieldErrors.email}</ErrorText>
      </div>

      <div className="mb-2">
        <div className="relative">
          <Lock size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-textmuted" />
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            className="pl-10 pr-10"
            error={fieldErrors.password}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-textmuted transition-colors hover:text-textprimary active:scale-95"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        <ErrorText>{fieldErrors.password}</ErrorText>
      </div>

      {error && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4">
          <ErrorText>{error}</ErrorText>
        </motion.div>
      )}

      <Button type="submit" loading={loading} className="mt-4 w-full">
        {loading ? 'Logging in…' : 'Log in'}
      </Button>

      <p className="mt-6 text-center text-sm text-textsecondary">
        Don't have an account?{' '}
        <Link to="/signup" className="font-medium text-accent transition-colors hover:text-accentstrong">
          Sign up
        </Link>
      </p>
    </motion.form>
  );
};

export default LoginForm;
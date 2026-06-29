import { LineChart } from 'lucide-react';
import LoginForm from '../features/auth/components/LoginForm';

const LoginPage = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-page px-4">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(98,88,207,0.12), transparent 45%), radial-gradient(circle at 80% 80%, rgba(21,151,108,0.08), transparent 45%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'radial-gradient(circle at center, black, transparent 75%)',
        }}
      />
      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center gap-2.5">
          <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-accent to-accentstrong shadow-md shadow-accent/20">
            <LineChart size={20} className="text-white" />
            <span className="absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
          </span>
          <span className="text-xl font-bold tracking-tight text-textprimary">Tradeflow</span>
        </div>
        <div className="rounded-card border border-bordersubtle bg-surface/70 p-7 shadow-xl backdrop-blur-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
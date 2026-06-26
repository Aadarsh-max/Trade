import SignupForm from '../features/auth/components/SignupForm';

const SignupPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-page px-4">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(circle at 20% 20%, rgba(127,119,221,0.15), transparent 50%), radial-gradient(circle at 80% 80%, rgba(29,158,117,0.1), transparent 50%)',
        }}
      />
      <div className="relative z-10">
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
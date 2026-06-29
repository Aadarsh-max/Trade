const ErrorText = ({ children }) => {
  if (!children) return null;

  return (
    <p className="mt-1.5 flex items-start gap-1 text-xs font-medium leading-snug text-dangersoft animate-fade-in">
      {children}
    </p>
  );
};

export default ErrorText;
const ErrorText = ({ children }) => {
  if (!children) return null;

  return <p className="text-dangerSoft text-xs mt-1.5">{children}</p>;
};

export default ErrorText;
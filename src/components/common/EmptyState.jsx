const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex animate-fade-in-up flex-col items-center justify-center px-4 py-12 text-center sm:py-16">
      {Icon && (
        <div className="relative mb-4">
          <div className="absolute inset-0 rounded-2xl bg-accent/10 blur-xl" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-bordersubtle bg-glass">
            <Icon size={26} className="text-textsecondary" />
          </div>
        </div>
      )}
      <p className="mb-1.5 text-sm font-semibold text-textprimary sm:text-base">{title}</p>
      {description && (
        <p className="mb-5 max-w-xs text-xs leading-relaxed text-textmuted sm:text-sm">
          {description}
        </p>
      )}
      {action}
    </div>
  );
};

export default EmptyState;
const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      {Icon && <Icon size={28} className="text-textmuted mb-3" />}
      <p className="text-textprimary text-sm font-medium mb-1">{title}</p>
      {description && <p className="text-textmuted text-xs mb-4">{description}</p>}
      {action}
    </div>
  );
};

export default EmptyState;
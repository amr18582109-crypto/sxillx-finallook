const Button = ({ children, onClick, variant = 'primary', className = '', disabled = false, ...props }) => {
  const base = 'btn';
  const variants = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-secondary',
    ghost: 'btn-secondary',
  };

  const classNames = `${base} ${variants[variant] || variants.primary} ${className}`;

  return (
    <button
      className={classNames}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;



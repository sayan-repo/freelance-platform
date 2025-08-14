const Avatar = ({ src, alt, size = 'md', className = '' }) => {
    const sizeClasses = {
      xs: 'w-6 h-6',
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16'
    };
  
    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        {src ? (
          <img 
            src={src} 
            alt={alt} 
            className="rounded-full object-cover w-full h-full"
          />
        ) : (
          <div className="bg-gray-200 border-2 border-dashed rounded-full w-full h-full flex items-center justify-center text-gray-500">
            {alt ? alt.charAt(0).toUpperCase() : 'U'}
          </div>
        )}
      </div>
    );
  };
  
  export default Avatar;
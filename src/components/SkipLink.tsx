import React from 'react';

interface SkipLinkProps {
  targetId: string;
  className?: string;
}

/**
 * SkipLink component for accessibility - allows keyboard users to skip navigation
 * and jump directly to main content
 */
const SkipLink: React.FC<SkipLinkProps> = ({ 
  targetId = 'main-content',
  className = ''
}) => {
  return (
    <a 
      href={`#${targetId}`}
      className={`skip-link ${className}`}
      data-testid="skip-link"
    >
      Skip to main content
    </a>
  );
};

export default SkipLink;

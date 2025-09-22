import React from 'react';

interface FlagProps {
  className?: string;
  size?: number;
}

export const BrazilFlag: React.FC<FlagProps> = ({ className = "", size = 20 }) => (
  <svg
    width={size}
    height={size * 0.7}
    viewBox="0 0 20 14"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="20" height="14" fill="#009739" />
    <polygon points="10,2 18,7 10,12 2,7" fill="#FEDD00" />
    <circle cx="10" cy="7" r="3.5" fill="#012169" />
    <path
      d="M 6.5 7 Q 10 5.5 13.5 7 Q 10 8.5 6.5 7"
      fill="#FEDD00"
      stroke="#FEDD00"
      strokeWidth="0.2"
    />
  </svg>
);

export const AustriaFlag: React.FC<FlagProps> = ({ className = "", size = 20 }) => (
  <svg
    width={size}
    height={size * 0.67}
    viewBox="0 0 20 13.4"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="20" height="13.4" fill="#ED2939" />
    <rect width="20" height="4.47" y="4.47" fill="#FFFFFF" />
  </svg>
);

export const EnglandFlag: React.FC<FlagProps> = ({ className = "", size = 20 }) => (
  <svg
    width={size}
    height={size * 0.6}
    viewBox="0 0 20 12"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="20" height="12" fill="#012169" />
    <path d="M 0 0 L 20 12 M 20 0 L 0 12" stroke="#FFFFFF" strokeWidth="1.33" />
    <path d="M 0 0 L 20 12 M 20 0 L 0 12" stroke="#C8102E" strokeWidth="0.8" />
    <rect width="20" height="2" y="5" fill="#FFFFFF" />
    <rect width="2" height="12" x="9" fill="#FFFFFF" />
    <rect width="20" height="1.2" y="5.4" fill="#C8102E" />
    <rect width="1.2" height="12" x="9.4" fill="#C8102E" />
  </svg>
);
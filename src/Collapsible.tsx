import React, { useState, type ReactNode } from 'react';

interface CollapsibleProps {
  title: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  iconBgColor: string;
  iconColor: string;
  children: ReactNode;
  className?: string;
}

const ChevronDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 9l-7 7-7-7" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Collapsible: React.FC<CollapsibleProps> = ({ title, count, icon: Icon, color, iconBgColor, iconColor, children, className }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`collapsible-section ${className || ''}`} style={{ backgroundColor: color }}>
      <div className="collapsible-header" onClick={() => setIsOpen(!isOpen)}>
        <div className="header-left">
          <div className="header-icon" style={{ backgroundColor: iconBgColor }}>
            <Icon className={iconColor} />
          </div>
          <div className="header-title">
            <h4>{title}</h4>
            <p>{count} available</p>
          </div>
        </div>
        <div className={`chevron-wrapper ${isOpen ? 'open' : ''}`}>
          <ChevronDown />
        </div>
      </div>
      {isOpen && <div className="collapsible-content">{children}</div>}
    </div>
  );
};

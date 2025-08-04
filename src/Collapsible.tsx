import React, { useState, type ReactNode } from 'react';

interface CollapsibleProps {
  title: string;
  count: number;
  icon: React.ComponentType<{ className?: string }>;
  children: ReactNode;
  sectionClasses: string;
  iconBgClass: string;
  iconClass: string;
}

const ChevronDown = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 9l-7 7-7-7" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Collapsible: React.FC<CollapsibleProps> = ({ title, count, icon: Icon, children, sectionClasses, iconBgClass, iconClass }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`p-3 rounded-xl border ${sectionClasses}`}>
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBgClass}`}>
            <Icon className={iconClass} />
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{title}</h4>
            <p className="text-sm text-gray-500">{count} available</p>
          </div>
        </div>
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <ChevronDown />
        </div>
      </div>
      {isOpen && <div className="pt-3 flex flex-col gap-2">{children}</div>}
    </div>
  );
};

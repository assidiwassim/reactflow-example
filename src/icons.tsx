
export const TriggerIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const StagnationIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const NoActivityIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const StageChangeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const DataChangeIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 7v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V7M4 7c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2M4 7h16M7 11h2m-2 4h4" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

export const TriggersIcon = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10.8333 2.5L5 11.6667H10L9.16667 17.5L15 8.33333H10L10.8333 2.5Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const SendIcon = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M16.6667 3.33331L9.16667 10.8333M16.6667 3.33331L11.6667 16.6666L9.16667 10.8333L3.33333 8.33331L16.6667 3.33331Z"
      stroke="#4B5563"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ExitIcon = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12.5 3.33331H15.8333C16.2754 3.33331 16.6993 3.50891 17.0118 3.82145C17.3244 4.13399 17.5 4.55795 17.5 5.00008V15C17.5 15.4422 17.3244 15.8661 17.0118 16.1787C16.6993 16.4912 16.2754 16.6667 15.8333 16.6667H12.5"
      stroke="#4B5563"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.33333 13.3333L12.5 10L8.33333 6.66669"
      stroke="#4B5563"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.5 10H2.5"
      stroke="#4B5563"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ActionsIcon = ({ className }: { className?: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M12.2222 18.3333C15.6132 18.3333 18.3333 15.6132 18.3333 12.2222C18.3333 8.83123 15.6132 6.11108 12.2222 6.11108C8.83123 6.11108 6.11108 8.83123 6.11108 12.2222C6.11108 15.6132 8.83123 18.3333 12.2222 18.3333Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.2222 3.88892V2.77783" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12.2222 21.6667V20.5556" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.9663 7.47729L17.7441 6.69951" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.69951 17.7441L7.47729 16.9663" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M20.5556 12.2222H21.6667" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.77783 12.2222H3.88892" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16.9663 16.9663L17.7441 17.7441" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.69951 6.69951L7.47729 7.47729" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const SendNudgeIcon = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M8.33333 6.66667V10M8.33333 13.3333H8.34167M15.8333 10C15.8333 14.6024 12.2691 18.3333 7.5 18.3333C2.73096 18.3333 -0.833333 14.6024 -0.833333 10C-0.833333 5.39763 2.73096 1.66667 7.5 1.66667C12.2691 1.66667 15.8333 5.39763 15.8333 10Z" transform="translate(1.66667, 0)" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const CreateTaskIcon = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M15.8333 3.33331H4.16667C3.24619 3.33331 2.5 4.07951 2.5 5.00008V16.6667C2.5 17.5873 3.24619 18.3334 4.16667 18.3334H15.8333C16.7538 18.3334 17.5 17.5873 17.5 16.6667V5.00008C17.5 4.07951 16.7538 3.33331 15.8333 3.33331Z" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13.3333 1.66669V5.00002" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6.66669 1.66669V5.00002" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2.5 8.33331H17.5" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const ConditionsIcon = ({ className }: { className?: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.61929 11.3807 7.5 10 7.5C8.61929 7.5 7.5 8.61929 7.5 10C7.5 11.3807 8.61929 12.5 10 12.5Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function getIcon(name: string) {
  switch (name) {
    case 'stagnation':
      return StagnationIcon;
    case 'no-activity':
      return NoActivityIcon;
    case 'stage-change':
      return StageChangeIcon;
    case 'data-change':
      return DataChangeIcon;
    case 'send':
      return SendIcon;
    case 'exit':
      return ExitIcon;
    case 'actions':
      return ActionsIcon;
    case 'send-nudge':
      return SendNudgeIcon;
    case 'create-task':
      return CreateTaskIcon;
    case 'triggers':
      return TriggersIcon;
    case 'conditions':
      return ConditionsIcon;
    default:
      return null;
  }
}

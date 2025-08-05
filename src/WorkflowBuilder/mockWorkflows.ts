import { type Workflow } from './types';

export const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Onboarding Nudge Sequence',
    description: 'A sequence of nudges for new user onboarding.',
    status: 'Published',
    lastModified: '2023-08-15',
    nodes: [],
    edges: [],
    executionCount: 125,
  },
  {
    id: '2',
    name: 'Feature Adoption Campaign',
    description: 'Campaign to drive adoption of a new feature.',
    status: 'Draft',
    lastModified: '2023-08-10',
    nodes: [],
    edges: [],
    executionCount: 78,
  },
  {
    id: '3',
    name: 'Proactive Support Workflow',
    description: 'Workflow to provide support before users ask.',
    status: 'Draft',
    lastModified: '2023-08-05',
    nodes: [],
    edges: [],
    executionCount: 210,
  },
  {
    id: '4',
    name: 'Subscription Renewal Reminder',
    description: 'Reminds users to renew their subscription.',
    status: 'Published',
    lastModified: '2023-08-01',
    nodes: [],
    edges: [],
    executionCount: 540,
  },
];

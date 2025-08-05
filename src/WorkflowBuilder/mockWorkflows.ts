import { type Workflow } from './types';

export const mockWorkflows: Workflow[] = [
  {
    id: '1',
    name: 'Onboarding Nudge Sequence',
    description: 'A workflow to guide new users through the initial setup process.',
    lastModified: '2024-07-29',
    status: 'Published',
    nodes: [],
    edges: [],
  },
  {
    id: '2',
    name: 'Feature Adoption Campaign',
    description: 'Nudges users to try out new features and provides helpful tips.',
    lastModified: '2024-07-28',
    status: 'Draft',
    nodes: [],
    edges: [],
  },
  {
    id: '3',
    name: 'Trial Conversion Flow',
    description: 'Encourages trial users to upgrade to a paid plan before their trial ends.',
    lastModified: '2024-07-25',
    status: 'Draft',
    nodes: [],
    edges: [],
  },
];

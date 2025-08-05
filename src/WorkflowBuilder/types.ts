import type { Node, Edge } from '@xyflow/react';

export interface Workflow {
  id: string;
  name: string;
  description: string;
  lastModified: string;
  status: 'Draft' | 'Published';
  nodes: Node[];
  edges: Edge[];
}

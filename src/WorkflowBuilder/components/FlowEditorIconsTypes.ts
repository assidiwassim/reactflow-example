export const NodeCategory = {
  Trigger: 'trigger',
  Condition: 'condition',
  Action: 'action',
} as const;

type NodeCategoryValues = (typeof NodeCategory)[keyof typeof NodeCategory];

export type CustomNodeData = {
  name: string;
  type: string;
  description: string;
  category: NodeCategoryValues;
  icon: string;
  isConfigured: boolean;
  config?: { [key: string]: any };
};

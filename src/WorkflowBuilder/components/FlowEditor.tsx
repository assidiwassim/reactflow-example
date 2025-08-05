import { useState, useRef, useCallback, useEffect } from 'react';
import { ReactFlow, ReactFlowProvider, addEdge, useNodesState, useEdgesState, Controls, Background, MiniMap } from '@xyflow/react';
import type { Connection, Edge, Node, ReactFlowInstance } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import FlowEditorSidebar from './FlowEditorSidebar';
import { CustomNode } from './CustomNode';
import { NodeCategory } from './FlowEditorIconsTypes';
import { NodeConfigurationModal } from './NodeConfigurationModal';
import { type Workflow } from '../types';

const nodeTypes = { custom: CustomNode };

const minimapNodeColor = (node: Node) => {
  switch (node.data.category) {
    case NodeCategory.Trigger:
      return '#A7F3D0';
    case NodeCategory.Condition:
      return '#BFDBFE';
    case NodeCategory.Action:
      return '#DDD6FE';
    default:
      return '#E5E7EB';
  }
};

interface FlowEditorProps {
  workflow: Workflow | null;
}

const FlowEditor: React.FC<FlowEditorProps> = ({ workflow }) => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(workflow?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(workflow?.edges || []);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (workflow) {
      setNodes(workflow.nodes || []);
      setEdges(workflow.edges || []);
    } else {
      setNodes([]);
      setEdges([]);
    }
  }, [workflow, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      if (!reactFlowInstance) return;
      const { target } = params;
      const targetNode = reactFlowInstance.getNode(target as string);
      if (targetNode?.data.category === NodeCategory.Trigger) {
        console.warn('Triggers cannot have incoming connections.');
        return;
      }
      setEdges((eds) => addEdge(params, eds));
    },
    [reactFlowInstance, setEdges]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const data = JSON.parse(event.dataTransfer.getData('application/reactflow-data'));

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node = {
        id: `${data.type}-${+new Date()}`,
        type: 'custom',
        position,
        data: {
          ...data,
          name: data.type,
          isConfigured: false,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  };

  const onNodeDoubleClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setIsModalOpen(true);
  };

    const handleNodeSave = (newName: string) => {
    if (!selectedNode) return;
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === selectedNode.id) {
          return {
            ...n,
            data: {
              ...n.data,
              name: newName,
              isConfigured: true,
            },
          };
        }
        return n;
      })
    );
    setSelectedNode(null);
    setIsModalOpen(false);
  };

  const handleNodeDelete = () => {
    if (!selectedNode) return;
    setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
    setSelectedNode(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleNodeConfig = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const action = target.closest('[data-action="configure"]');
      if (action && selectedNode) {
        setIsModalOpen(true);
      }
    };
    document.addEventListener('click', handleNodeConfig);
    return () => document.removeEventListener('click', handleNodeConfig);
  }, [selectedNode]);

  return (
    <div className="flex flex-grow p-5 gap-5 h-full overflow-hidden">
      <FlowEditorSidebar />
      <ReactFlowProvider>
        <div className="flex-grow bg-white rounded-lg border p-5 relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onNodeDoubleClick={onNodeDoubleClick}
            nodeTypes={nodeTypes}
            fitView
            className="bg-gray-50"
          >
            <Controls />
            <MiniMap nodeColor={minimapNodeColor} nodeStrokeWidth={3} zoomable pannable />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      {isModalOpen && selectedNode && (
                <NodeConfigurationModal
          isOpen={isModalOpen}
          node={selectedNode}
          onClose={() => setIsModalOpen(false)}
          onSave={handleNodeSave}
          onDelete={handleNodeDelete}
        />
      )}
    </div>
  );
};

export default FlowEditor;

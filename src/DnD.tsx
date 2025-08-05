import React, { useState, useRef, useCallback, useMemo } from 'react';
import { ReactFlow, ReactFlowProvider, addEdge, useNodesState, useEdgesState, Controls, Background, MiniMap, Panel } from '@xyflow/react';
import type { Connection, Edge, Node, ReactFlowInstance } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import Sidebar from './Sidebar';
import { CustomNode } from './CustomNode';
import { ConfigurationModal } from './ConfigurationModal';

const nodeTypes = { custom: CustomNode };

const initialNodes: Node[] = [];

const getId = () => `dndnode_${+new Date()}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const initialEdges: Edge[] = [];
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const defaultEdgeOptions = useMemo(
    () => ({
      type: 'default',
      style: { strokeWidth: 2.5, stroke: '#9ca3af', strokeDasharray: '5 5' },
      animated: true,
    }),
    []
  );

  const onConnect = useCallback((params: Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowInstance) {
        return;
      }

      const nodeDataString = event.dataTransfer.getData('application/reactflow-data');

      if (!nodeDataString) {
        return;
      }

      const nodeData = JSON.parse(nodeDataString);

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: getId(),
        type: 'custom',
        position,
        data: { ...nodeData, isConfigured: false, config: {} },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    const target = event.target as HTMLElement;
    const action = target.closest('[data-action]')?.getAttribute('data-action');

    if (action === 'configure') {
      setSelectedNode(node);
      setIsModalOpen(true);
    }
  }, []);

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedNode(null);
  };

  const handleModalSave = (newLabel: string) => {
    if (!selectedNode) return;

    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: {
              ...node.data,
              label: newLabel,
              isConfigured: true,
              config: { ...(node.data.config || {}), label: newLabel },
            },
          };
        }
        return node;
      })
    );

    handleModalClose();
  };

  const handleDeleteNode = () => {
    if (!selectedNode) return;

    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
    handleModalClose();
  };

  return (
    <div className="flex flex-grow p-5 gap-5 h-full overflow-hidden">
      <Sidebar />
      <ReactFlowProvider>
        <div className="flex-grow bg-white rounded-lg border p-5 relative" ref={reactFlowWrapper}>
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Workflow Canvas</h2>
            <span className="bg-gray-100 text-gray-800 text-xs font-medium px-3 py-1 rounded-full">
              {nodes.length} {nodes.length === 1 ? 'node' : 'nodes'}
            </span>
          </div>
          <hr className="my-4" />
          <Controls />
          <div className="p-0 h-[540px]">
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
              defaultEdgeOptions={defaultEdgeOptions}
              fitView
              attributionPosition="bottom-left"
              className="bg-gray-50"
              minZoom={0.5}
              maxZoom={1.5}
              nodeTypes={nodeTypes}
            >
              <Background gap={20} size={1} />
              <MiniMap
                nodeColor={(node) => {
                  switch (node.data.type) {
                    case 'trigger':
                      return '#4ade80'; // green-400
                    case 'condition':
                      return '#60a5fa'; // blue-400
                    case 'action':
                      return '#c084fc'; // purple-400
                    default:
                      return '#9ca3af'; // gray-400
                  }
                }}
                className="!bg-white !border-gray-200"
              />
              <Panel position="top-left">
                <div className="bg-white p-2 rounded-lg shadow-sm border text-xs text-gray-600">
                  Drag nodes from the left panel to build your workflow
                </div>
              </Panel>
            </ReactFlow>
          </div>
        </div>
      </ReactFlowProvider>
      <ConfigurationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleModalSave}
        onDelete={handleDeleteNode}
        node={selectedNode}
      />
    </div>
  );
};

export default DnDFlow;

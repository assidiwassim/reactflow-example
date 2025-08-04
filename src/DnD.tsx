import React, { useState, useRef, useCallback } from 'react';
import { ReactFlow, ReactFlowProvider, addEdge, useNodesState, useEdgesState, Controls, Background, MiniMap, Panel } from '@xyflow/react';
import type { Connection, Edge, Node, ReactFlowInstance } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import Sidebar from './Sidebar';
import { CustomNode } from './CustomNode';


const initialNodes: Node[] = [];

let id = 0;
const getId = () => `${id++}`;

const nodeTypes = { custom: CustomNode };

const DnDFlow = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const initialEdges: Edge[] = [];
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

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

      const nodeDataString = event.dataTransfer.getData('application/reactflow');

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
        data: {
          label: nodeData.label,
          description: nodeData.description,
          icon: nodeData.icon,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div className="flex flex-grow p-5 gap-5">
      <Sidebar />
      <ReactFlowProvider>
        <div className="flex-grow bg-white rounded-lg border p-5 relative" ref={reactFlowWrapper}>
          <h2 className="text-lg font-semibold text-gray-800 mb-5">Workflow Canvas</h2>
          <hr className="my-5" />
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
                switch (node.type) {
                  case 'trigger': return '#10b981';
                  case 'condition': return '#3b82f6';
                  case 'action': return '#8b5cf6';
                  default: return '#6b7280';
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
    </div>
  );
};

export default DnDFlow;

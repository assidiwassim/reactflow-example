import React, { useState, useRef, useCallback } from 'react';
import { ReactFlow, ReactFlowProvider, addEdge, useNodesState, useEdgesState, Controls } from '@xyflow/react';
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
        <div className="flex-grow bg-white rounded-lg shadow-lg p-5 relative" ref={reactFlowWrapper}>
            <h2 className="text-lg font-semibold text-gray-800 mb-5">Workflow Canvas</h2>
            <Controls showInteractive={false} showFitView={false} />
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
                nodeTypes={nodeTypes}
            >
                {nodes.length === 0 && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400 text-base border-2 border-dashed border-gray-300 px-16 py-10 rounded-lg pointer-events-none">
                        Drag components here
                    </div>
                )}
            </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
};

export default DnDFlow;

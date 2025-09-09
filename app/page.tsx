"use client";

import { useState, useCallback } from "react";

import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from "@xyflow/react";

import type React from "react";
import { type NodeProps } from "@xyflow/react";
import { Database, Mail } from "lucide-react";
import { BaseNode } from "@/components/nodes/base-node";

// Custom node components
function DatabaseNode(props: NodeProps) {
  return (
    <BaseNode
      {...props}
      icon={Database}
      title={props.data.title || "Database"}
      subtitle={props.data.subtitle}
      color="bg-blue-600"
      status={props.data.status}
      onConfigure={props.data.onConfigure}
    />
  );
}

function EmailNode(props: NodeProps) {
  return (
    <BaseNode
      {...props}
      icon={Mail}
      title={props.data.title || "Email"}
      subtitle={props.data.subtitle}
      color="bg-green-600"
      status={props.data.status}
      onConfigure={props.data.onConfigure}
    />
  );
}

const nodeTypes = {
  database: DatabaseNode,
  email: EmailNode,
};

export default function Home() {
  const initialNodes = [
    {
      id: "n1",
      type: "database",
      position: { x: 100, y: 100 },
      data: {
        title: "User Database",
        subtitle: "PostgreSQL",
        status: "idle",
      },
    },
    {
      id: "n2",
      type: "email",
      position: { x: 400, y: 100 },
      data: {
        title: "Send Email",
        subtitle: "Gmail SMTP",
        status: "waiting",
      },
    },
  ];
  const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}

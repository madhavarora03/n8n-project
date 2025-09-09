"use client";

import type React from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Settings, Play, CheckCircle, XCircle, Clock } from "lucide-react";

interface BaseNodeProps extends NodeProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  color: string;
  children?: React.ReactNode;
  showTargetHandle?: boolean;
  showSourceHandle?: boolean;
  status?: "idle" | "running" | "success" | "error" | "waiting";
  onConfigure?: () => void;
}

export function BaseNode({
  icon: Icon,
  title,
  subtitle,
  color,
  children,
  showTargetHandle = true,
  showSourceHandle = true,
  selected,
  status = "idle",
  onConfigure,
}: BaseNodeProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "running":
        return <Play className="h-3 w-3 text-blue-500 animate-pulse" />;
      case "success":
        return <CheckCircle className="h-3 w-3 text-green-500" />;
      case "error":
        return <XCircle className="h-3 w-3 text-red-500" />;
      case "waiting":
        return <Clock className="h-3 w-3 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "running":
        return "border-blue-500";
      case "success":
        return "border-green-500";
      case "error":
        return "border-red-500";
      case "waiting":
        return "border-yellow-500";
      default:
        return "";
    }
  };

  return (
    <Card
      className={cn(
        "min-w-[200px] transition-all duration-200 relative group",
        selected && "ring-2 ring-primary ring-offset-2 ring-offset-background",
        getStatusColor()
      )}
    >
      {showTargetHandle && (
        <Handle
          type="target"
          position={Position.Left}
          className="w-3 h-3 !bg-primary border-2 border-background"
        />
      )}

      <div className="absolute top-2 right-2 flex items-center gap-1">
        {getStatusIcon()}
        {onConfigure && (
          <button
            onClick={onConfigure}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-accent rounded"
          >
            <Settings className="h-3 w-3 text-muted-foreground" />
          </button>
        )}
      </div>

      <div className="p-3">
        <div className="flex items-center gap-2 mb-2">
          <div className={cn("p-1.5 rounded-md", color)}>
            <Icon className="h-4 w-4 text-white" />
          </div>
          <div className="flex-1 min-w-0 pr-8">
            <h3 className="font-medium text-sm text-foreground truncate">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-muted-foreground truncate">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {children}

        {status !== "idle" && (
          <div className="mt-2">
            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                status === "running" && "border-blue-500 text-blue-600",
                status === "success" && "border-green-500 text-green-600",
                status === "error" && "border-red-500 text-red-600",
                status === "waiting" && "border-yellow-500 text-yellow-600"
              )}
            >
              {status}
            </Badge>
          </div>
        )}
      </div>

      {showSourceHandle && (
        <Handle
          type="source"
          position={Position.Right}
          className="w-3 h-3 !bg-primary border-2 border-background"
        />
      )}
    </Card>
  );
}

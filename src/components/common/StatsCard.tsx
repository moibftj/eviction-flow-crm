
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  subtitle?: string;
  trend?: {
    direction: "up" | "down" | "neutral";
    value: string;
  };
  className?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  subtitle,
  trend,
  className = "",
}) => {
  const getTrendColor = () => {
    if (trend?.direction === "up") return "text-green-600";
    if (trend?.direction === "down") return "text-red-600";
    return "text-gray-500";
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="mt-2 flex items-baseline">
              <p className="text-2xl font-semibold">{value}</p>
              {trend && (
                <span className={`ml-2 text-xs ${getTrendColor()}`}>
                  {trend.direction === "up" && "↑"}
                  {trend.direction === "down" && "↓"}
                  {trend.value}
                </span>
              )}
            </div>
            {subtitle && <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          {icon && <div className="text-primary">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;

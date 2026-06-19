import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  clean?: boolean;
}

export const Container: React.FC<ContainerProps> = ({ className, clean = false, children, ...props }) => {
  return (
    <div
      className={cn(
        "w-full mx-auto",
        !clean && "px-4 sm:px-6 lg:px-8 max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

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
        !clean && "px-5 sm:px-8 lg:px-10 xl:px-16 max-w-7xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

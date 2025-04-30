"use client";

import type * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface SplitDropdownButtonProps {
  label?: string;
  icon?: React.ReactNode;
  options: {
    label: string;
    value: string;
    icon?: React.ReactNode;
    onClick?: () => void;
  }[];
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg";
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  iconOnly?: boolean;
  rounded?: boolean;
  bordered?: boolean;
  gradient?: boolean;
  minimal?: boolean;
  onSelect?: (value: string) => void;
  onClick?: () => void;
}

export function SplitDropdownButton({
  label,
  icon,
  options,
  variant = "default",
  size = "default",
  className,
  buttonClassName,
  dropdownClassName,
  iconOnly = false,
  rounded = false,
  bordered = false,
  gradient = false,
  minimal = false,
  onSelect,
  onClick,
}: SplitDropdownButtonProps) {
  const router = useRouter();
  const handleSelect = (value: string, optionOnClick?: () => void) => {
    if (value === "criar-tutorial") {
      onSelect?.(value);
      optionOnClick?.();
      router.push("/create");
      return;
    }
    onSelect?.(value);
    optionOnClick?.();
  };

  // Base styles
  const containerClasses = cn(
    "flex group",
    rounded && "overflow-hidden",
    className
  );

  // Button styles
  const mainButtonClasses = cn(
    "transition-all duration-200",
    rounded ? "rounded-l-full" : "rounded-r-none",
    // Fixed gradient variant
    gradient &&
      !variant &&
      "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 border-0",
    // Fixed minimal variant
    minimal &&
      variant === "default" &&
      "bg-primary/20 hover:bg-primary/30 text-primary-foreground border-0",
    // Fixed bordered variant
    bordered && "border border-primary border-r-0",
    buttonClassName
  );

  // Dropdown trigger styles
  const dropdownTriggerClasses = cn(
    "transition-all duration-200 px-2",
    rounded ? "rounded-r-full" : "rounded-l-none",
    // Fixed gradient variant
    gradient &&
      !variant &&
      "bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 border-0",
    // Fixed minimal variant
    minimal &&
      variant === "default" &&
      "bg-primary/20 hover:bg-primary/30 text-primary-foreground border-0",
    // Fixed bordered variant
    bordered && "border border-primary border-l-0",
    dropdownClassName
  );

  // Separator styles
  const separatorClasses = cn(
    "h-full transition-opacity duration-200",
    minimal && "opacity-30 group-hover:opacity-50",
    gradient && "opacity-30 bg-white/30"
  );

  return (
    <div className={containerClasses}>
      <Button
        variant={gradient || minimal ? undefined : variant}
        size={size}
        className={mainButtonClasses}
        onClick={onClick}
      >
        {icon && (
          <span
            className={cn(
              "transition-transform duration-200 group-hover:scale-110",
              iconOnly ? "" : "mr-1"
            )}
          >
            {icon}
          </span>
        )}
        {!iconOnly && label}
      </Button>
      <Separator orientation="vertical" className={separatorClasses} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={gradient || minimal ? undefined : variant}
            size={size}
            className={dropdownTriggerClasses}
            aria-label="Show options"
          >
            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          {options.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => handleSelect(option.value, option.onClick)}
            >
              {option.icon && <span className="mr-2">{option.icon}</span>}
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

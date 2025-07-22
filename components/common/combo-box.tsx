"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { ReactNode, useState } from "react";

export interface IComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  avatar?: string;
  description?: string;
  icon?: ReactNode;
}

export interface IComboBoxProps {
  options: IComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  allowDeselect?: boolean;
  className?: string;
  width?: string;
  buttonVariant?: "default" | "outline" | "secondary" | "ghost";
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  showAvatar?: boolean;
  renderOption?: (option: IComboboxOption, isSelected: boolean) => ReactNode;
  renderSelected?: (option: IComboboxOption) => ReactNode;
}

export function ComboBox({
  options,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  disabled = false,
  allowDeselect = true,
  className,
  width = "w-[200px]",
  buttonVariant = "outline",
  align = "start",
  side = "bottom",
  showAvatar = false,
  renderOption,
  renderSelected,
}: IComboBoxProps) {
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(value || "");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Use controlled or uncontrolled value
  const currentValue = value !== undefined ? value : internalValue;
  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
  };

  const selectedOption = options.find(
    (option) => option.value === currentValue
  );

  const defaultRenderOption = (
    option: IComboboxOption,
    isSelected: boolean
  ) => (
    <div className="flex items-center gap-2 w-full">
      {showAvatar && (
        <Avatar className="size-6">
          <AvatarImage
            src={option.avatar || "/placeholder.svg"}
            alt={option.label}
          />
          <AvatarFallback className="font-semibold text-xs">
            {option.label.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
      {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
      <div className="flex flex-col flex-1 min-w-0">
        <span className="truncate">{option.label}</span>
        {option.description && (
          <span className="text-muted-foreground text-xs truncate">
            {option.description}
          </span>
        )}
      </div>
      <Check
        className={cn(
          "flex-shrink-0 ml-auto size-4",
          isSelected ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );

  const defaultRenderSelected = (option: IComboboxOption) => (
    <div className="flex flex-1 items-center gap-2 min-w-0">
      {showAvatar && (
        <Avatar className="size-6">
          <AvatarImage
            src={option.avatar || "/placeholder.svg"}
            alt={option.label}
          />
          <AvatarFallback className="font-semibolds text-xs">
            {option.label.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      )}
      {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
      <span className="truncate">{option.label}</span>
    </div>
  );

  const ComboboxList = ({
    setOpen,
    setValue,
  }: {
    setOpen: (open: boolean) => void;
    setValue: (value: string) => void;
  }) => (
    <Command>
      <CommandInput placeholder={searchPlaceholder} />
      <CommandList>
        <CommandEmpty>{emptyText}</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              onSelect={(selectedValue) => {
                const newValue =
                  allowDeselect && selectedValue === currentValue
                    ? ""
                    : selectedValue;
                setValue(newValue);
                setOpen(false);
              }}
              className="cursor-pointer"
            >
              {renderOption
                ? renderOption(option, currentValue === option.value)
                : defaultRenderOption(option, currentValue === option.value)}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={buttonVariant}
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(width, "justify-between", className)}
          >
            <div className="flex flex-1 items-center gap-2 min-w-0">
              {selectedOption ? (
                renderSelected ? (
                  renderSelected(selectedOption)
                ) : (
                  defaultRenderSelected(selectedOption)
                )
              ) : (
                <span className="truncate">{placeholder}</span>
              )}
            </div>
            <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn("p-0", width)} align={align} side={side}>
          <ComboboxList setOpen={setOpen} setValue={handleValueChange} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant={buttonVariant}
          role="combobox"
          aria-expanded={open}
          disabled={disabled}
          className={cn(width, "justify-between", className)}
        >
          <div className="flex flex-1 items-center gap-2 min-w-0">
            {selectedOption ? (
              renderSelected ? (
                renderSelected(selectedOption)
              ) : (
                defaultRenderSelected(selectedOption)
              )
            ) : (
              <span className="truncate">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <ComboboxList setOpen={setOpen} setValue={handleValueChange} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

/** biome-ignore-all lint/suspicious/noArrayIndexKey: <Not an issue> */
"use client";
import { ChevronDown } from "lucide-react";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/registry/new-york-v4/ui/collapsible";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/new-york-v4/ui/table";

interface ApiProp {
  name: string;
  type: string;
  required?: boolean;
  description?: string;
  defaultValue?: string;
}

interface ApiRefTableProps {
  props: ApiProp[];
  className?: string;
}

function ApiRefRow({ prop }: { prop: ApiProp }) {
  const [open, setOpen] = React.useState(false);
  const hasDetails = !!prop.description;

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      render={(props) => <tbody {...props} />}
    >
      <CollapsibleTrigger
        disabled={!hasDetails}
        render={(props) => (
          <TableRow
            {...props}
            tabIndex={hasDetails ? 0 : undefined}
            className={cn(
              hasDetails
                ? "cursor-pointer focus-visible:outline-none focus-visible:bg-muted/70"
                : "hover:bg-inherit",
            )}
            onKeyDown={(e) => {
              // This fixes a11y
              if (hasDetails && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                setOpen((state) => !state);
              }
            }}
          />
        )}
      >
        <TableCell>
          <span>
            <span className="font-mono text-xs font-medium">{prop.name}</span>
            {prop.required && (
              <span className="text-destructive text-xs">*</span>
            )}
          </span>
        </TableCell>
        <TableCell>
          <code className="font-mono text-xs">{prop.type}</code>
        </TableCell>
        <TableCell className="flex items-center justify-between">
          {prop.defaultValue ? (
            <code className="font-mono text-xs">{prop.defaultValue}</code>
          ) : (
            <span className="text-muted-foreground text-xs">—</span>
          )}
          {hasDetails && (
            <ChevronDown
              className={cn(
                "h-3 w-3 shrink-0 text-muted-foreground transition-transform",
                open && "rotate-180",
              )}
            />
          )}
        </TableCell>
      </CollapsibleTrigger>
      <CollapsibleContent render={(props) => <TableRow {...props} />}>
        <TableCell colSpan={3} className="text-xs text-muted-foreground">
          {prop.description && <p>{prop.description}</p>}
        </TableCell>
      </CollapsibleContent>
    </Collapsible>
  );
}

export function ApiRefTable({ props, className }: ApiRefTableProps) {
  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead>Prop</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Default</TableHead>
        </TableRow>
      </TableHeader>
      {props.map((prop) => (
        <ApiRefRow key={prop.name} prop={prop} />
      ))}
    </Table>
  );
}

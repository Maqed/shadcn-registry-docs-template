import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";
import { ApiRefTable } from "@/components/api-ref-table";
import { CodeBlockCommand } from "@/components/code-block-command";
import { CodeTabs } from "@/components/code-tabs";
import { ComponentPreview } from "@/components/component-preview";
import { ComponentSource } from "@/components/component-source";
import { ComponentsList } from "@/components/components-list";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/registry/new-york-v4/ui/tabs";
import { ComponentPreviewTabs } from "./components/component-preview-tabs";
import { cn } from "./lib/utils";

function Step({ className, ...props }: ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "mt-8 scroll-m-32 text-lg font-medium tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

function Steps({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "steps mb-12 [counter-reset:step] md:ml-4 md:border-l md:pl-8 [&>h3]:step",
        className,
      )}
      {...props}
    />
  );
}

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    ComponentsList,
    ComponentPreview,
    ComponentSource,
    ComponentPreviewTabs,
    CodeTabs,
    Tabs,
    CodeBlockCommand,
    TabsContent,
    TabsList,
    ApiRefTable,
    TabsTrigger,
    Step,
    Steps,
  };
}

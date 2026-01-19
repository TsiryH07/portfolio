"use client";

import {FileDown} from "lucide-react";

import {buttonVariants} from "@/components/ui/button";
import {cn} from "@/components/utils";

type ExportCvButtonProps = {
  className?: string;
};

export function ExportCvButton({className}: ExportCvButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={cn(
        buttonVariants({variant: "outline", size: "lg"}),
        className,
      )}
    >
      <FileDown className="h-5 w-5" aria-hidden="true" />
      Exporter PDF
    </button>
  );
}

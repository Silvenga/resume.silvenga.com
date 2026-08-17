import { useMemo } from "react";
import { markdownToPdfDom } from "./md-to-pdf-dom";

export type PdfMarkdownProps = {
  markdown: string;
};

export function PdfMarkdown({ markdown }: PdfMarkdownProps) {
  const dom = useMemo(() => markdownToPdfDom(markdown), [markdown]);
  return dom;
}

import { useMemo } from "react";
import { forceRemountOnFastRefresh } from "../../utilities/fast-refresh";
import { markdownToPdfDom } from "./md-to-pdf-dom";

// Fast refresh just hates this project...
// It's related to service workers...
forceRemountOnFastRefresh(module);

export type PdfMarkdownProps = {
    markdown: string;
};

export function PdfMarkdown({ markdown }: PdfMarkdownProps) {
    const dom = useMemo(() => markdownToPdfDom(markdown), [markdown]);
    return dom;
}

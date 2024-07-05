import markdownit from "markdown-it";
import { useMemo } from "react";

export type MarkdownProps = {
    markdown?: string;
};

// react-markdown has issues with tree shaking and this isn't used with untrusted data.
// So YOLO!

export function Markdown({ markdown }: MarkdownProps) {
    const md = useMemo(() => markdownit(), []);
    const markup = useMemo(() => markdown ? md.render(markdown) : "", [markdown]);
    return (
        <div dangerouslySetInnerHTML={{ __html: markup }} />
    );
}

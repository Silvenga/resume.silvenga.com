import "npm:react-pdf/dist/Page/TextLayer.css";
import "npm:react-pdf/dist/Page/AnnotationLayer.css";

import clsx from "clsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Document as ViewDocument, Page as ViewPage } from "react-pdf";
import { DocumentProps, usePDF } from "@react-pdf/renderer";

export type PdfViewerProps = {
    children: React.ReactElement<DocumentProps>;
};

export function PdfViewer({ children }: PdfViewerProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [pdfPageCount, setPdfPageCount] = useState<number>(0);
    const loaded = useCallback((document: { numPages: number }) => {
        // Types for OnDocumentLoadSuccess aren't exposed.
        setPdfPageCount(document.numPages);
        setIsLoading(false);
    }, []);

    const [instance, updateInstance] = usePDF({ document: children });

    useEffect(() => {
        setIsLoading(true);
        updateInstance(children);
    }, [children]);

    const pages = useMemo(() => Array.from(Array(pdfPageCount).keys()), [pdfPageCount]);

    return (
        <>
            {!!isLoading && <Loading />}
            <ViewDocument
                file={instance.url}
                onLoadSuccess={loaded}
                className={clsx("flex flex-wrap", isLoading && "hidden")}>
                {pages.map(page => (
                    <ViewPage key={page} pageIndex={page} loading={null} className="m-8 rounded-lg overflow-hidden w-min mx-auto drop-shadow-lg border" />
                ))}
            </ViewDocument>
        </>
    );
}

function Loading() {
    // Show only after 200ms of waiting.
    const [show, setShow] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => setShow(true), 200);
        return () => clearTimeout(timeout);
    }, []);
    return (
        <div className="flex flex-col h-[100%]">
            {!!show && (
                <div className="text-center my-auto h-[100%]">Rendering...</div>
            )}
        </div>
    );
}

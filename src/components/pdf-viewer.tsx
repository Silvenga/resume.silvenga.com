import "npm:react-pdf/dist/Page/TextLayer.css";
import "npm:react-pdf/dist/Page/AnnotationLayer.css";

import clsx from "clsx";
import { useCallback, useMemo, useRef, useState } from "react";
import { Document as ViewDocument, Page as ViewPage } from "react-pdf";
import useSize from "@react-hook/size";
import { DocumentProps, usePDF } from "@react-pdf/renderer";

export type PdfViewerProps = {
    children: React.ReactElement<DocumentProps>;
    onLoaded?: (durationMs: number, url: string) => void;
};

export function PdfViewer({ children, onLoaded }: PdfViewerProps) {
    const mountTimeMs = useMemo(() => new Date().getMilliseconds(), []);
    const [isLoading, setIsLoading] = useState(true);
    const [pdfPageCount, setPdfPageCount] = useState<number>(0);
    const [instance] = usePDF({ document: children });

    const loadedHandler = useCallback((document: { numPages: number }) => {
        // Types for OnDocumentLoadSuccess aren't exposed.
        setPdfPageCount(document.numPages);
        setIsLoading(false);
        if (onLoaded) {
            // Firefox appears to be changing the clock ever so slightly to avoid fingerprinting.
            // So this value can be negative if done too fast.
            onLoaded(Math.abs(new Date().getMilliseconds() - mountTimeMs), instance.url!);
        }
    }, [instance]);

    const pages = useMemo(() => Array.from(Array(pdfPageCount).keys()), [pdfPageCount]);

    const sizingRef = useRef(null);
    const [containerWidth] = useSize(sizingRef);

    return (
        <div className="w-[100%] h-[100%] flex flex-col">
            {!!isLoading && <Loading />}
            <div className="relative" ref={sizingRef}>
                {/* Decouple pdf rendering from flexbox calculated size. */}
                <div className="absolute top-0 bottom-0 right-0 left-0">
                    <ViewDocument
                        file={instance.url}
                        onLoadSuccess={loadedHandler}
                        className={clsx("absolute top-0 bottom-0 right-0 left-0 flex-col items-end", isLoading && "hidden")}>
                        {pages.map(page => (
                            <ViewPage width={containerWidth} key={page} pageIndex={page} loading={null} className="rounded-lg overflow-hidden mb-4 drop-shadow border" />
                        ))}
                    </ViewDocument>
                </div>
            </div>
        </div>
    );
}

function Loading() {
    return (
        <div className="my-auto h-[100%] bg-white flex flex-col justify-center rounded-lg overflow-hidden mb-4 drop-shadow border">
            <div className="text-center">Rendering...</div>
        </div>
    );
}

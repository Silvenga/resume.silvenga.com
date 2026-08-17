import { type DocumentProps, usePDF } from "@react-pdf/renderer";
import clsx from "clsx";
import { useCallback, useMemo, useRef, useState } from "react";
import { Document as ViewDocument, Page as ViewPage } from "react-pdf";
import { useResizeObserver } from "usehooks-ts";

export type PdfViewerProps = {
  children: React.ReactElement<DocumentProps>;
  onLoaded?: (durationMs: number, url: string) => void;
};

export function PdfViewer({ children, onLoaded }: PdfViewerProps) {
  const mountTimeMs = useMemo(() => new Date().getMilliseconds(), []);
  const [isLoading, setIsLoading] = useState(true);
  const [pdfPageCount, setPdfPageCount] = useState<number>(0);
  const [instance] = usePDF({ document: children });

  const loadedHandler = useCallback(
    (document: { numPages: number }) => {
      // Types for OnDocumentLoadSuccess aren't exposed.
      setPdfPageCount(document.numPages);
      setIsLoading(false);
      if (onLoaded) {
        // Firefox appears to be changing the clock ever so slightly to avoid fingerprinting.
        // So this value can be negative if done too fast.
        onLoaded(Math.abs(new Date().getMilliseconds() - mountTimeMs), instance.url!);
      }
    },
    [instance, onLoaded, mountTimeMs],
  );

  const pages = useMemo(() => Array.from(Array(pdfPageCount).keys()), [pdfPageCount]);

  const sizingRef = useRef<HTMLDivElement>(null!);
  const { width: containerWidth = 0 } = useResizeObserver({ ref: sizingRef });

  const pdfContainerRef = useRef<HTMLDivElement>(null!);
  const { height: pdfHeight = 0 } = useResizeObserver({ ref: pdfContainerRef });

  return (
    <div
      className="relative flex w-full flex-col"
      style={{ height: pdfHeight ? pdfHeight : "100vh" }}
      ref={sizingRef}
    >
      {isLoading && <Loading />}
      {/* Decouple pdf rendering from flexbox calculated size. */}
      <div className="absolute top-0 right-0 left-0" ref={pdfContainerRef}>
        <ViewDocument
          file={instance.url}
          onLoadSuccess={loadedHandler}
          className={clsx("flex-col items-end", isLoading && "hidden")}
        >
          {pages.map((page) => (
            <ViewPage
              width={containerWidth}
              key={page}
              pageIndex={page}
              loading={null}
              className="mb-4 overflow-hidden rounded-lg border border-gray-200 drop-shadow"
            />
          ))}
        </ViewDocument>
      </div>
    </div>
  );
}

function Loading() {
  return (
    <div className="my-auto mb-4 flex h-full flex-col justify-center overflow-hidden rounded-lg border border-gray-200 bg-white drop-shadow">
      <div className="text-center">Rendering...</div>
    </div>
  );
}

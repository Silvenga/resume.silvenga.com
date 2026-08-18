import { useMemo } from "react";
import * as React from "react";
import { getResume } from "../data/resume.ts";
import type { PdfViewerProps } from "./pdf-viewer";
import { PdfViewer } from "./pdf-viewer";
import { ResumeDocument } from "./resume/document";
import { ErrorPage } from "./resume/error-page.js";
import { getResumeStyles } from "./resume/styles.ts";
import { ResumeContext, type ResumeContextProps } from "./resume/use-resume.js";

export type ResumeViewProps = {
  onLoaded?: PdfViewerProps["onLoaded"];
};

export function ResumeView({ onLoaded }: ResumeViewProps) {
  const context = useResumeContext();
  return (
    // Force a remount when this component HMRs.
    <PdfViewer key={context.etag} onLoaded={onLoaded}>
      {context.ok ? (
        // This must be within PdfViewer, since context doesn't propagate into PdfViewer.
        <ResumeContext.Provider value={context}>
          <ResumeDocument />
        </ResumeContext.Provider>
      ) : (
        <ErrorPage error={context.error} />
      )}
    </PdfViewer>
  );
}

type FalsifiableResumeContext =
  | { ok: false; error: unknown; etag: number }
  | ({ ok: true; etag: number } & ResumeContextProps);

function useResumeContext() {
  return useMemo<FalsifiableResumeContext>(() => {
    try {
      return {
        ok: true,
        etag: new Date().getTime(),
        now: new Date(),
        styles: getResumeStyles(),
        resume: getResume(),
      };
    } catch (e) {
      return {
        ok: false,
        etag: new Date().getTime(),
        error: e,
      };
    }
  }, []);
}

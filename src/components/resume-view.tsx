import type { PdfViewerProps } from "./pdf-viewer";
import { PdfViewer } from "./pdf-viewer";
import { ResumeDocument } from "./resume/document";
import { ResumeContextProvider } from "./resume/use-resume";

export type ResumeViewProps = {
  onLoaded?: PdfViewerProps["onLoaded"];
};

export function ResumeView({ onLoaded }: ResumeViewProps) {
  return (
    <PdfViewer onLoaded={onLoaded}>
      <ResumeContextProvider>
        <ResumeDocument />
      </ResumeContextProvider>
    </PdfViewer>
  );
}

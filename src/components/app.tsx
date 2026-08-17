import clsx from "clsx";
import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { IoArrowBackOutline, IoCodeDownloadOutline } from "react-icons/io5";
import { PdfViewer } from "./pdf-viewer";
import { ResumeDocument } from "./resume/document";
import { ResumeContextProvider } from "./resume/use-resume";

export function App() {
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string>();
  return (
    <div className="container mx-auto max-w-screen-xl p-3 md:p-9">
      <div className="flex items-center justify-center md:justify-start">
        <IoArrowBackOutline className="me-2" />
        <a href="https://silvenga.com" className="text-center font-medium hover:underline">
          Back to silvenga.com
        </a>
      </div>
      <main className="mt-3 flex h-max min-h-svh min-w-fit flex-col md:mt-6 md:flex-row-reverse">
        <SideMenu pdfBlobUrl={pdfBlobUrl} />
        <article className="grow">
          <PdfViewer
            onLoaded={(_, url) => {
              setPdfBlobUrl(url);
            }}
          >
            <ResumeContextProvider>
              <ResumeDocument />
            </ResumeContextProvider>
          </PdfViewer>
        </article>
      </main>
    </div>
  );
}

function SideMenu({ pdfBlobUrl }: { pdfBlobUrl?: string }) {
  const year = useMemo(() => DateTime.now().year, []);
  const disabled = !pdfBlobUrl;
  return (
    <aside
      className="mb-4 h-full w-full max-w-full text-center whitespace-nowrap select-none md:ms-9 md:mb-0 md:w-60"
      role="banner"
    >
      <div className="flex flex-col md:fixed md:h-[calc(100vh-8rem)] md:w-60">
        <a
          className={clsx(
            "flex items-center justify-center py-3 px-4 rounded bg-gray-900 text-white transition-all hover:bg-gray-600",
            disabled && "opacity-50 pointer-events-none cursor-default",
          )}
          role="button"
          href={pdfBlobUrl}
          download={`Mark Lopez ${year}.pdf`}
          type="application/pdf"
          rel="nofollow"
        >
          <IoCodeDownloadOutline className="me-3 h-6 w-6" />
          Download PDF
        </a>
        <div className="mt-auto hidden flex-col items-center space-y-3 text-center text-sm md:flex">
          <a
            href="https://github.com/Silvenga/resume.silvenga.com"
            className="hover:underline"
            target="_blank"
          >
            <FaGithub className="h-6 w-6" />
          </a>
        </div>
      </div>
    </aside>
  );
}

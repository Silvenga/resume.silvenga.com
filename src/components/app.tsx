import { lazy, Suspense, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { SideMenu } from "./side-menu.tsx";

const ResumeView = lazy(() => import("./resume-view").then((m) => ({ default: m.ResumeView })));

export function App() {
  const [renderTimeMs, setRenderTimeMs] = useState<number>();
  const [pdfBlobUrl, setPdfBlobUrl] = useState<string>();
  return (
    <div className="container mx-auto max-w-7xl p-3 md:p-9">
      <div className="flex items-center justify-center md:justify-start">
        <IoArrowBackOutline className="me-2" />
        <a href="https://silvenga.com" className="text-center font-medium hover:underline">
          Back to silvenga.com
        </a>
      </div>
      <main className="mt-3 flex h-max min-h-svh min-w-fit flex-col md:mt-6 md:flex-row-reverse">
        <SideMenu renderTimeMs={renderTimeMs} pdfBlobUrl={pdfBlobUrl} />
        <article className="grow">
          <Suspense>
            <ResumeView
              onLoaded={(durationMs, url) => {
                setRenderTimeMs(durationMs);
                setPdfBlobUrl(url);
              }}
            />
          </Suspense>
        </article>
      </main>
    </div>
  );
}

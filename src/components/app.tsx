import clsx from "clsx";
import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { IoCodeDownloadOutline } from "react-icons/io5";
import { TbJson } from "react-icons/tb";
import { TbAppWindow } from "react-icons/tb";
import { getResume } from "../data/resume";
import { PdfViewer } from "./pdf-viewer";
import { ResumeDocument } from "./resume/document";
import { ResumeContextProvider } from "./resume/use-resume";

export function App() {
    const [loadDurationMs, setLoadDurationMs] = useState<number>(0);
    const [pdfBlobUrl, setPdfBlobUrl] = useState<string>();
    return (

        <div className="min-w-fit min-h-svh h-max overflow-auto">
            <main className="container max-w-screen-lg mx-auto min-h-svh flex flex-col md:flex-row-reverse p-3 md:p-9">
                <SideMenu pdfBlobUrl={pdfBlobUrl} loadDurationMs={loadDurationMs} />
                <article className="grow">
                    <PdfViewer onLoaded={(duration, url) => {
                        setLoadDurationMs(duration);
                        setPdfBlobUrl(url);
                    }}>
                        <ResumeContextProvider>
                            <ResumeDocument />
                        </ResumeContextProvider>
                    </PdfViewer>
                </article>
            </main>
        </div>
    );
}

/* <footer className="text-center mt-12">
                    [<a href="https://github.com/Silvenga/resume.silvenga.com/" className="link link-hover" target="_blank">Source Code</a>]
  </footer> */

function SideMenu({ pdfBlobUrl, loadDurationMs }: { pdfBlobUrl?: string; loadDurationMs: number }) {
    const year = useMemo(() => DateTime.now().year, []);
    const jsonUrl = useMemo(() => {
        const resume = getResume();
        const json = JSON.stringify(resume, undefined, 2);
        return URL.createObjectURL(new Blob([json], {
            type: "application/json"
        }));
    }, []);
    const disabled = !pdfBlobUrl;
    return (
        <aside className="md:ms-9 mb-4 md:mb-0 w-[100%] md:w-max self-start flex flex-col select-none text-center" role="banner">
            <a
                className={clsx("flex items-center mb-3 py-3 px-4 rounded bg-white border drop-shadow-sm transition-all hover:bg-gray-100 active:bg-gray-200", disabled && "opacity-50 pointer-events-none cursor-default")}
                role="button"
                href={pdfBlobUrl}
                target="_blank">
                <TbAppWindow style={{ width: 24, height: 24 }} className="me-3" />Open in System PDF Reader
            </a>
            <div className="flex">
                <a
                    className={clsx("flex items-center grow mb-3 py-3 px-4 rounded bg-white border drop-shadow-sm transition-all hover:bg-gray-100 active:bg-gray-200", disabled && "opacity-50 pointer-events-none cursor-default")}
                    role="button"
                    href={pdfBlobUrl}
                    download={`Mark Lopez ${year}.pdf`}
                    type="application/pdf">
                    <IoCodeDownloadOutline style={{ width: 24, height: 24 }} className="me-auto" /> Save PDF
                </a>
                <a
                    className={clsx("ms-3 mb-3 py-3 px-4 rounded bg-white border drop-shadow-sm transition-all hover:bg-gray-100 active:bg-gray-200", disabled && "opacity-50 pointer-events-none cursor-default")}
                    role="button"
                    href={jsonUrl}
                    aria-label="Download Json"
                    download={`mark-lopez-${year}.json`}
                    type="application/pdf">
                    <TbJson style={{ width: 24, height: 24 }} />
                </a>
            </div>
            <div className="text-center">
                <a href="https://silvenga.com" className="text-center hover:underline font-medium">
                    Back to silvenga.com
                </a>

                <div className="text-center text-gray-600 text-sm">
                    <div>
                        [<a href="" className="hover:underline">Source Code</a>]
                    </div>
                    {!!loadDurationMs && (
                        <div>
                            Generated in ~{loadDurationMs}ms
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}

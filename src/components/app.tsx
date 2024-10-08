import clsx from "clsx";
import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { IoArrowBackOutline, IoCodeDownloadOutline } from "react-icons/io5";
import { TbJson } from "react-icons/tb";
import { TbAppWindow } from "react-icons/tb";
import { getResume } from "../data/resume";
import { forceRemountOnFastRefresh } from "../utilities/fast-refresh";
import { PdfViewer } from "./pdf-viewer";
import { ResumeDocument } from "./resume/document";
import { ResumeContextProvider } from "./resume/use-resume";

forceRemountOnFastRefresh(module);

export function App() {
    const [loadDurationMs, setLoadDurationMs] = useState<number>(0);
    const [pdfBlobUrl, setPdfBlobUrl] = useState<string>();
    return (
        <div className="container max-w-screen-xl mx-auto p-3 md:p-9">
            <div className="flex items-center justify-center md:justify-start">
                <IoArrowBackOutline className="me-2" />
                <a href="https://silvenga.com" className="text-center hover:underline font-medium">
                    Back to silvenga.com
                </a>
            </div>
            <main className="min-w-fit min-h-svh h-max flex flex-col md:flex-row-reverse mt-3 md:mt-6">
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
        <aside className="md:ms-9 mb-4 md:mb-0 w-[100%] md:w-min self-start flex flex-col select-none text-center whitespace-nowrap" role="banner">
            <a
                className={clsx("flex items-center justify-between mb-3 py-3 px-4 rounded bg-white dark:bg-gray-800 border dark:border-gray-600 drop-shadow-sm transition-all hover:bg-gray-100 dark:hover:bg-gray-600", disabled && "opacity-50 pointer-events-none cursor-default")}
                role="button"
                href={pdfBlobUrl}
                target="_blank"
                rel="nofollow">
                <TbAppWindow style={{ width: 24, height: 24 }} className="me-3" />Open in System PDF Reader
            </a>
            <div className="flex">
                <a
                    className={clsx("flex items-center justify-between grow py-3 px-4 rounded bg-white dark:bg-gray-800 border dark:border-gray-600 drop-shadow-sm transition-all hover:bg-gray-100 dark:hover:bg-gray-600", disabled && "opacity-50 pointer-events-none cursor-default")}
                    role="button"
                    href={pdfBlobUrl}
                    download={`Mark Lopez ${year}.pdf`}
                    type="application/pdf"
                    rel="nofollow">
                    <IoCodeDownloadOutline style={{ width: 24, height: 24 }} className="me-3" /> Save PDF
                </a>
                <a
                    className={clsx("ms-3 py-3 px-4 rounded bg-white dark:bg-gray-800 border dark:border-gray-600 drop-shadow-sm transition-all hover:bg-gray-100 dark:hover:bg-gray-600", disabled && "opacity-50 pointer-events-none cursor-default")}
                    role="button"
                    href={jsonUrl}
                    aria-label="Download Json"
                    download={`mark-lopez-${year}.json`}
                    type="application/pdf"
                    rel="nofollow">
                    <TbJson style={{ width: 24, height: 24 }} />
                </a>
            </div>
            <div className="text-center hidden sm:block mt-6">
                <div className="text-center text-gray-600 dark:text-gray-400 text-sm">
                    <div>
                        [<a href="https://github.com/Silvenga/resume.silvenga.com" className="hover:underline" target="_blank">Source Code</a>]
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

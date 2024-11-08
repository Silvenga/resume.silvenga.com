import clsx from "clsx";
import { DateTime } from "luxon";
import { useMemo, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { IoArrowBackOutline, IoCodeDownloadOutline } from "react-icons/io5";
import { forceRemountOnFastRefresh } from "../utilities/fast-refresh";
import { PdfViewer } from "./pdf-viewer";
import { ResumeDocument } from "./resume/document";
import { ResumeContextProvider } from "./resume/use-resume";

forceRemountOnFastRefresh(module);

export function App() {
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
                <SideMenu pdfBlobUrl={pdfBlobUrl} />
                <article className="grow">
                    <PdfViewer onLoaded={(_, url) => {
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

function SideMenu({ pdfBlobUrl }: { pdfBlobUrl?: string }) {
    const year = useMemo(() => DateTime.now().year, []);
    const disabled = !pdfBlobUrl;
    return (
        <aside className="h-full md:ms-9 mb-4 md:mb-0 w-full md:w-60 max-w-full select-none text-center whitespace-nowrap" role="banner">
            <div className="flex flex-col md:fixed md:w-60 md:h-[calc(100vh-8rem)]">
                <a
                    className={clsx("flex items-center justify-center py-3 px-4 rounded bg-gray-900 text-white transition-all hover:bg-gray-600", disabled && "opacity-50 pointer-events-none cursor-default")}
                    role="button"
                    href={pdfBlobUrl}
                    download={`Mark Lopez ${year}.pdf`}
                    type="application/pdf"
                    rel="nofollow">
                    <IoCodeDownloadOutline className="me-3 h-6 w-6" />
                    Download PDF
                </a>
                <div className="hidden md:flex flex-col items-center text-center mt-auto space-y-3 text-sm">
                    <a href="https://github.com/Silvenga/resume.silvenga.com" className="hover:underline" target="_blank">
                        <FaGithub className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </aside>
    );
}

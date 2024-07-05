import { PdfViewer } from "./pdf-viewer";
import { ResumeDocument } from "./resume/document";

export function App() {
    return (
        <div className="min-w-fit min-h-svh">
            <main className="container mx-auto py-12 min-h-svh flex flex-col">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl">Mark's Resume</h1>
                    [<a href="https://silvenga.com" className="link link-hover">Back to silvenga.com</a>]
                </header>
                <div className="grow">
                    <PdfViewer>
                        <ResumeDocument />
                    </PdfViewer>
                </div>
                <footer className="text-center mt-12">
                    [<a href="https://github.com/Silvenga/resume.silvenga.com/" className="link link-hover" target="_blank">Source Code</a>]
                </footer>
            </main>
        </div>
    );
}

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { pdfjs } from "react-pdf";
import { App } from "./components/app";

// https://github.com/wojtekmaj/react-pdf?tab=readme-ov-file#import-worker-recommended
// Use path name to avoid cache breaking being added... by something... (likely parcel, but that would be weird)
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "npm:pdfjs-dist/build/pdf.worker.mjs",
    import.meta.url,
).pathname;

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);

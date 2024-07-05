import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { pdfjs } from "react-pdf";
import { App } from "./components/app";

// https://github.com/wojtekmaj/react-pdf?tab=readme-ov-file#import-worker-recommended
// TODO Double check if parcel attempts to transpile this.
// This pulls in web assembly stuff.
// Either way, it's here because it really doesn't like HMR.
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "npm:pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
).toString();

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);

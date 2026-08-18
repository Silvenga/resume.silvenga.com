import { useMemo } from "react";
import { FaGithub } from "react-icons/fa";
import { IoCodeDownloadOutline } from "react-icons/io5";
import { LinkButton } from "./link-button.tsx";

const SourceCode = "https://github.com/Silvenga/resume.silvenga.com";

type SideMenuProps = {
  renderTimeMs?: number;
  pdfBlobUrl?: string;
};

export function SideMenu({ pdfBlobUrl, renderTimeMs }: SideMenuProps) {
  const year = useYear();
  return (
    <header className="mb-4 h-full w-full max-w-full text-center whitespace-nowrap select-none md:ms-9 md:mb-0 md:w-60">
      <div className="flex flex-row gap-3 md:fixed md:h-[calc(100vh-8rem)] md:w-60 md:flex-col">
        <LinkButton
          variant="primary"
          href={pdfBlobUrl}
          download={`Mark Lopez ${year}.pdf`}
          type="application/pdf"
          rel="nofollow"
          className="w-full"
        >
          <IoCodeDownloadOutline className="h-6 w-6" />
          Download PDF
        </LinkButton>
        <LinkButton
          variant="ghost"
          target="_blank"
          href={SourceCode}
          aria-label="Source Code"
          className="w-full"
        >
          <FaGithub className="h-6 w-6" />
          Source Code
        </LinkButton>
        <div className="mt-auto hidden flex-col items-center space-y-3 text-center text-sm md:flex">
          {renderTimeMs != null && (
            <div className="text-xs text-gray-500">Rendered in {renderTimeMs}ms</div>
          )}
        </div>
      </div>
    </header>
  );
}

function useYear() {
  return useMemo(() => new Date().getFullYear(), []);
}

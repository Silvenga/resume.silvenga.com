import { type PropsWithChildren, createContext, useContext, useMemo } from "react";
import { getResume } from "../../data/resume";
import type { Resume } from "../../data/schema";
import { type ResumeStyles, getResumeStyles } from "./styles";

export type ResumeContextProps = {
  now: Date;
  styles: ResumeStyles;
  resume: Resume;
};

const ResumeContext = createContext<ResumeContextProps | undefined>(undefined);

export function ResumeContextProvider({ children }: PropsWithChildren) {
  const context = useMemo(() => {
    return {
      now: new Date(),
      styles: getResumeStyles(),
      resume: getResume(),
    };
  }, []);
  return <ResumeContext.Provider value={context}>{children}</ResumeContext.Provider>;
}

export function useResume(): ResumeContextProps {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error(
      "The react-hook 'useResume' may only be used within a 'ResumeContextProvider'.",
    );
  }
  return context;
}

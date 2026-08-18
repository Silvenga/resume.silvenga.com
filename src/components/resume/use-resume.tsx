import { createContext, useContext } from "react";
import type { Resume } from "../../data/schema";
import { type ResumeStyles } from "./styles";

export type ResumeContextProps = {
  now: Date;
  styles: ResumeStyles;
  resume: Resume;
};

export const ResumeContext = createContext<ResumeContextProps | undefined>(undefined);

export function useResume(): ResumeContextProps {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error(
      "The react-hook 'useResume' may only be used within a 'ResumeContextProvider'.",
    );
  }
  return context;
}

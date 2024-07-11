import { DateTime } from "luxon";
import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import { getResume } from "../../data/resume";
import { Resume } from "../../data/schema";
import { ResumeStyles, getResumeStyles } from "./styles";

export type ResumeContextProps = {
    now: DateTime;
    styles: ResumeStyles;
    resume: Resume;
};

const ResumeContext = createContext<ResumeContextProps | undefined>(undefined);

export function ResumeContextProvider({ children }: PropsWithChildren) {
    const context = useMemo(() => {
        return {
            now: DateTime.now(),
            styles: getResumeStyles(),
            resume: getResume()
        };
    }, []);
    return (
        <ResumeContext.Provider value={context}>
            {children}
        </ResumeContext.Provider>
    );
}

export function useResume(): ResumeContextProps {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error("The react-hook 'useResume' may only be used within a 'ResumeContextProvider'.");
    }
    return context;
}

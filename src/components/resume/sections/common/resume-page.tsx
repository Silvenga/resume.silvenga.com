import { PropsWithChildren } from "react";
import { Page, Text } from "@react-pdf/renderer";
import { tw } from "../../styles";
import { useResume } from "../../use-resume";

const pageSize = "LETTER";

export function ResumePage({ children }: PropsWithChildren) {
    const { styles } = useResume();
    return (
        <Page size={pageSize} style={styles.page} wrap>
            {children}
            <PageCounter />
        </Page>
    );
}

function PageCounter() {
    return (
        <Text
            style={tw("text-center absolute bottom-[12px] left-0 right-0 text-gray-400 font-medium")}
            render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
            fixed />
    );
}

import { PropsWithChildren } from "react";
import { Page, Text, View } from "@react-pdf/renderer";
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
    const { now, resume: { subject: { familyName, givenName } } } = useResume();
    return (
        <View style={tw("absolute px-[0.5in] bottom-[0.5in] left-0 right-0 text-gray-400 text-sm font-medium flex flex-row justify-between")} fixed>
            <Text>{givenName} {familyName}</Text>
            <Text>Generated {now.toFormat("yyyy-LL-dd")}</Text>
            <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}></Text>
        </View>
    );
}

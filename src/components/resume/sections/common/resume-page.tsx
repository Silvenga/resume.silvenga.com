import { Page, Text, View } from "@react-pdf/renderer";
import type { PropsWithChildren } from "react";
import { tw } from "../../styles";
import { useResume } from "../../use-resume";

const pageSize = "LETTER";

function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

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
  const {
    now,
    resume: {
      subject: { familyName, givenName },
    },
  } = useResume();
  return (
    <View
      style={tw(
        "absolute px-[0.5in] bottom-[0.5in] left-0 right-0 text-gray-400 text-sm font-medium flex flex-row justify-between",
      )}
      fixed
    >
      <Text>
        {givenName} {familyName}
      </Text>
      <Text>Generated {formatDate(now)}</Text>
      <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}></Text>
    </View>
  );
}

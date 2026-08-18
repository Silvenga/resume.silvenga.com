import { Page, Text, View } from "@react-pdf/renderer";
import type { PropsWithChildren } from "react";
import { tw } from "../../styles";
import { useResume } from "../../use-resume";

function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function ResumePage({ children }: PropsWithChildren) {
  const { styles } = useResume();
  return (
    <Page size="LETTER" style={styles.page} wrap>
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
      style={tw("text-gray-400 text-sm font-medium flex flex-row justify-between mt-auto")}
      fixed
    >
      <Text>
        {givenName} {familyName}
      </Text>
      <Text>Generated {formatDate(now)}</Text>
      <Text render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`} />
    </View>
  );
}

import { Page, Document, Text } from "@react-pdf/renderer";

export function ErrorPage({ error }: { error: unknown }) {
  return (
    <Document pageLayout="oneColumn">
      <Page
        size="LETTER"
        style={{
          padding: "0.5in",
          fontSize: "10pt",
        }}
      >
        <Text>Error: {String(error)}</Text>
      </Page>
    </Document>
  );
}

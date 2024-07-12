import { createTw } from "react-pdf-tailwind";
import { Font, StyleSheet, Styles } from "@react-pdf/renderer";

export const tw = createTw({
    theme: {
        fontFamily: {
            sans: ["Inter"],
        },
    }
}, { ptPerRem: 9 });

// @react-pdf/renderer hides this type...
export type Style = ReturnType<typeof tw>;

// https://tailwindcss.com/docs/customizing-colors
export const colors = {
    gray50: "#f9fafb",
    gray100: "#f3f4f6",
    gray200: "#e5e7eb",
    gray300: "#d1d5db",
    gray400: "#9ca3af",
    gray500: "#6b7280",
    gray600: "#4b5563",
    gray700: "#374151",
    gray800: "#1f2937",
    gray900: "#111827",
    gray950: "#030712",
    white: "#ffffff",
    black: "#000000",
};

const theme: Styles = {
    bodyText: {
        // lineHeight: 28,
        color: colors.gray700,
        fontWeight: 400,
        ...tw("text-base")
    },
    headerText: {
        // lineHeight: 32,
        color: colors.gray900,
        fontWeight: 600,
    },
    linkText: {
        // lineHeight: 32,
        color: colors.gray900,
        fontWeight: 500
    },
};

export function getResumeStyles() {
    return StyleSheet.create({
        page: {
            ...theme.bodyText,
            flexDirection: "column",
            backgroundColor: "white",
            fontFamily: "Inter",
            padding: "0.5in",
            paddingBottom: 32 // Make room for the page number.
        },
        h1: {
            ...theme.headerText,
            fontSize: 32,
            marginBottom: 4,
            ...tw("text-5xl leading-snug")
        },
        h2: {
            ...theme.headerText,
            fontSize: 18,
            marginBottom: 4,
            ...tw("text-2xl leading-snug")
        },
        h3: {
            ...theme.headerText,
            fontSize: 14,
            marginBottom: 2,
            ...tw("text-xl leading-snug")
        },
        subTitle: {
            ...theme.headerText,
            fontSize: 16,
            marginBottom: 2,
        },
    });
}

export type ResumeStyles = ReturnType<typeof getResumeStyles>;

// TODO This adds 500 KiB to the bundle.
// This all needs to be statically analyzable.
Font.register({
    family: "Inter",
    fonts: [
        {
            src: new URL("../../assets/inter-ttf/inter-latin-100-normal.ttf", import.meta.url).toString(),
            fontWeight: 100
        },
        {
            src: new URL("../../assets/inter-ttf/inter-latin-200-normal.ttf", import.meta.url).toString(),
            fontWeight: 200
        },
        {
            src: new URL("../../assets/inter-ttf/inter-latin-300-normal.ttf", import.meta.url).toString(),
            fontWeight: 300
        },
        {
            src: new URL("../../assets/inter-ttf/inter-latin-400-normal.ttf", import.meta.url).toString(),
            fontWeight: 400
        },
        {
            src: new URL("../../assets/inter-ttf/inter-latin-500-normal.ttf", import.meta.url).toString(),
            fontWeight: 500
        },
        {
            src: new URL("../../assets/inter-ttf/inter-latin-600-normal.ttf", import.meta.url).toString(),
            fontWeight: 600
        },
        {
            src: new URL("../../assets/inter-ttf/inter-latin-700-normal.ttf", import.meta.url).toString(),
            fontWeight: 700
        },
        {
            src: new URL("../../assets/inter-ttf/inter-latin-800-normal.ttf", import.meta.url).toString(),
            fontWeight: 800
        },
        {
            src: new URL("../../assets/inter-ttf/inter-latin-900-normal.ttf", import.meta.url).toString(),
            fontWeight: 900
        },
    ]
});

Font.registerHyphenationCallback(word => [word]);

import { Text, View } from "@react-pdf/renderer";
import { TimeRange } from "../../../../data/schema";

export type InlineTimeRangeProps = {
    range: TimeRange;
};

export function InlineTimeRange({ range: { fromYear, toYear } }: InlineTimeRangeProps) {
    return (
        <View>
            <Text>{fromYear} - {toYear === "now" ? "Present" : toYear}</Text>
        </View>
    );
}

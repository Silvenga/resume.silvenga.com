import { orderBy } from "natural-orderby";
import { Text } from "@react-pdf/renderer";
import { Technology } from "../../../../data/technologies";
import { selectMany } from "../../../../utilities/collections";

export function TechnologiesList({ technologies }: { technologies: Technology[] }) {
    const groups = Object.groupBy(technologies, x => x.name);
    const keys = orderBy(Object.keys(groups));
    const list = keys.map(name => {
        const values = groups[name]!;
        const versions = orderBy(selectMany(values, x => x.versions)).toReversed();
        return versions.length
            ? `${name} (${versions.join(", ")})`
            : name;
    });
    return (
        <Text>{list.join(", ")}</Text>
    );
}

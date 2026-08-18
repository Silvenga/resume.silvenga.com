import { Text } from "@react-pdf/renderer";
import { orderBy } from "natural-orderby";
import type { Technology } from "../../../../data/technologies";
import { selectMany } from "../../../../utilities/collections";

export function TechnologiesList({ technologies }: { technologies: Technology[] }) {
  const groups = Object.groupBy(technologies, (x) => x.name);
  const list = Object.keys(groups).map((name) => {
    const values = groups[name]!;
    const versions = orderBy(selectMany(values, (x) => x.versions)).toReversed();
    if (versions.length === 0) {
      return name;
    }
    if (versions.length === 1) {
      return `${name} ${versions[0]}`;
    }
    return `${name} (${versions.join(", ")})`;
  });
  return <Text>{list.join(", ")}</Text>;
}

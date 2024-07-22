const technologyKinds = [
    "framework",
    "runtime",
    "protocol",
    "library",
    "db",
    "service",
    "os",
    "platform",
    "cloud",
    "language",
    "testing",
    "networking",
];

export type TechnologyKind = typeof technologyKinds[number];

export type Technology =
    | { kind: TechnologyKind; name: string; versions: string[] }
    | { kind: undefined; name: string; versions: string[] };

export function transformTechnology(x: string): Technology {
    // i.e. framework/ReactJS, language/C# (5, 6)

    // JS regex is so limiting...
    const technologiesRegex = /^([^[\n]+)(?:\s\[(.+)\])?$/gm;
    const result = technologiesRegex.exec(x);
    if (!result) {
        throw new Error(`Failed to parsed input technology '${x}', incorrect format.`);
    }

    const namePart = result[1];
    const { kind, name } = parseName(namePart);

    const versionsPart = result[2];
    const versions = parseVersions(versionsPart);

    return { kind, name, versions };
}

function parseName(input: string) {
    // i.e. framework/ReactJS
    const [kind, name] = input.split("/", 2);
    return name && technologyKinds.includes(kind)
        ? { kind: kind, name: name }
        : { kind: undefined, name: input };
}

function parseVersions(input?: string) {
    if (!input) {
        return [];
    }
    const results = input.split(",").reduce((agg, x) => agg.add(x.trim()), new Set<string>());
    return [...results];
}

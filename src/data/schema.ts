import { DateTime } from "luxon";
import { z } from "zod";

// Primitives

export const YearSchema = z.number().int().positive();

export type Year = z.infer<typeof YearSchema>;

export const PastYearSchema = YearSchema.refine(x => x <= DateTime.now().year, "Year cannot be in the future");

export const TimeRangeSchema = z.object({
    fromYear: YearSchema,
    toYear: YearSchema.or(z.literal("now"))
}).refine(({ fromYear, toYear }) => toYear == "now" || fromYear <= toYear, "fromYear cannot be greater than toYear");

export type TimeRange = z.infer<typeof TimeRangeSchema>;

export const HttpsLinkSchema = z.string().startsWith("https://", "Links must start with https://");
export const MailToLinkSchema = z.string().startsWith("mailto:", "Links must start with mailto:");

export const HrefSchema = HttpsLinkSchema.or(MailToLinkSchema);

// Subject

export const LinkSchema = z.object({
    label: z.string().min(1),
    href: HrefSchema
});

export const SubjectSchema = z.object({
    givenName: z.string(),
    familyName: z.string(),
    location: z.string(),
    links: z.array(
        LinkSchema
    ),
});

export type Subject = z.infer<typeof SubjectSchema>;

// Technologies

export const technologyKinds = [
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
    | { kind: TechnologyKind; name: string }
    | { kind: undefined; name: string };

export const TechnologySchema = z.string().min(1).transform<Technology>(x => {
    // i.e. framework/ReactJS

    const [kind, name] = x.split("/", 2);

    return name && technologyKinds.includes(kind)
        ? { kind: kind, name: name }
        : { kind: undefined, name: x };
});

export const TechnologySchemaWithKind = TechnologySchema
    .refine(x => !!x.kind, x => ({ message: `Technology '${x.name}' must have a kind` }));

export const TechnologiesSchema = z.object({
    frontend: z.array(TechnologySchemaWithKind),
    backend: z.array(TechnologySchemaWithKind),
    database: z.array(TechnologySchemaWithKind),
    infrastructure: z.array(TechnologySchemaWithKind),
    methodologies: z.array(TechnologySchema),
    testing: z.array(TechnologySchema),
}).partial();

export type Technologies = z.infer<typeof TechnologySchema>;

// Work History

const WorkHistoryItemSchema = z.object({
    label: z.string(),
    entity: z.string(),
    timeRange: TimeRangeSchema,
    description: z.string(),
    technologies: TechnologiesSchema
});

export type WorkHistoryItem = z.infer<typeof WorkHistoryItemSchema>;

export const WorkHistorySchema = z.array(
    WorkHistoryItemSchema
);

// Education

export const EducationItemSchema = z.object({
    label: z.string(),
    degree: z.string(),
    timeRange: TimeRangeSchema,
    grade: z.string(),
});

export type EducationItem = z.infer<typeof EducationItemSchema>;

export const EducationSchema = z.array(
    EducationItemSchema
);

// Talks

export const TalkSchema = z.object({
    label: z.string(),
    link: HrefSchema,
    description: z.string(),
    year: PastYearSchema,
});

export type Talk = z.infer<typeof TalkSchema>;

export const TalksSchema = z.array(
    TalkSchema
);

// Root

export const ResumeSchema = z.object({
    subject: SubjectSchema,
    workHistory: WorkHistorySchema,
    education: EducationSchema,
    talks: TalksSchema
});

export type Resume = z.infer<typeof ResumeSchema>;

export function parseResume(obj: unknown): Resume {
    return ResumeSchema.parse(obj);
}
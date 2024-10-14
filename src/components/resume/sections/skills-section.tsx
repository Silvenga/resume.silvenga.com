import { Text, View } from "@react-pdf/renderer";
import { selectMany } from "../../../utilities/collections";
import { forceRemountOnFastRefresh } from "../../../utilities/fast-refresh";
import { tw } from "../styles";
import { useResume } from "../use-resume";
import { Section } from "./common/section";
import { SectionHeader } from "./common/section-header";
import { TechnologiesList } from "./common/technology-list";

// TODO
forceRemountOnFastRefresh(module);

export function SkillsSection() {
    const { resume: { workHistory } } = useResume();

    const technologies = {
        backend: selectMany(workHistory, x => x.technologies.backend),
        frontend: selectMany(workHistory, x => x.technologies.frontend),
        database: selectMany(workHistory, x => x.technologies.database),
        infrastructure: selectMany(workHistory, x => x.technologies.infrastructure),
        methodologies: selectMany(workHistory, x => x.technologies.methodologies),
        testing: selectMany(workHistory, x => x.technologies.testing),
    };

    return (
        <View wrap={false}>
            <Section>
                <SectionHeader>Skills</SectionHeader>
                <Text style={tw("text-gray-700 font-semibold mb-1")}>Backend Technologies</Text>
                <TechnologiesList technologies={technologies.backend} />
                <Text style={tw("text-gray-700 font-semibold mb-1 mt-4")}>Frontend Technologies</Text>
                <TechnologiesList technologies={technologies.frontend} />
                <Text style={tw("text-gray-700 font-semibold mb-1 mt-4")}>Database Technologies</Text>
                <TechnologiesList technologies={technologies.database} />
                <Text style={tw("text-gray-700 font-semibold mb-1 mt-4")}>Infrastructure Technologies</Text>
                <TechnologiesList technologies={technologies.infrastructure} />
                <Text style={tw("text-gray-700 font-semibold mb-1 mt-4")}>Developer-Lead Testing Experience</Text>
                <TechnologiesList technologies={technologies.testing} />
            </Section>
        </View>
    );
}

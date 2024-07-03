import data from "./resume.yaml";
import { Resume, parseResume } from "./schema";

export function getResume(): Resume {
    return parseResume(data);
}

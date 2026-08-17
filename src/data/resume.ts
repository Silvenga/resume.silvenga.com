import data from "./resume.yaml";
import type { Resume } from "./schema";
import { parseResume } from "./schema";

export function getResume(): Resume {
  return parseResume(data);
}

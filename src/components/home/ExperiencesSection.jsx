import SectionHeading from '../SectionHeading.jsx';
import ExperienceCard from '../ExperienceCard.jsx';
import { experiences } from '../../data/experiences.js';
import { homeContent } from '../../data/content.js';

export default function ExperiencesSection() {
  const c = homeContent.experiences;
  return (
    <section id="experiences" className="scroll-mt-20 bg-ivory py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={c.eyebrow} title={c.title} text={c.text} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {experiences.map((exp, i) => (
            <ExperienceCard key={exp.id} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

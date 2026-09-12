import DetailsCard from "@/components/DetailsCard"

const present = (exp) => ({
  id: exp.id,
  image: exp.logo,
  imageAlt: exp.company || exp.community || exp.organization,
  title: exp.company || exp.community || exp.organization,
  subtitle: exp.role,
  line: `${exp.role} | ${exp.period}`,
  description: exp.description,
})

export default function ExperienceCard({ title, experiences, onSelect }) {
  return (
    <DetailsCard
      title={title}
      items={experiences}
      present={present}
      onSelect={onSelect}
    />
  )
}
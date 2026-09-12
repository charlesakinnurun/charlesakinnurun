import DetailsCard from "@/components/DetailsCard"

const present = (edu) => ({
  id: edu.id,
  image: edu.image,
  imageAlt: edu.institution,
  title: edu.institution,
  subtitle: edu.degree,
  line: `${edu.degree} | ${edu.duration}`,
  description: edu.description,
})

export default function EducationCard({ title, entries, onSelect }) {
  return (
    <DetailsCard
      title={title}
      items={entries}
      present={present}
      onSelect={onSelect}
    />
  )
}
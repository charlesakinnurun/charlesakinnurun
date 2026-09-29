import ProjectGallery from '@/components/ProjectGallery'

const cases = {
  single: { title: 'Single image project', images: ['/codealpha-image.jpg'] },
  legacy: { title: 'Legacy single image project', image: '/lbg.jpg' },
  multi: {
    title: 'Multi image project',
    images: ['/codealpha-image.jpg', '/aws-ai-productivity-app.webp', '/bcg-x.png'],
  },
  none: { title: 'No image project' },
  broken: { title: 'Broken image project', images: ['/does-not-exist-1.png', '/codealpha-image.jpg'] },
}

export default function GallerySmoke() {
  return (
    <div className="bg-zinc-950 p-6 space-y-8">
      {Object.entries(cases).map(([key, project]) => (
        <section key={key} data-case={key}>
          <ProjectGallery project={project} />
        </section>
      ))}
    </div>
  )
}

# Project images

One folder per project, named after the project's `id` in `data/projects.js`:

```text
/public/images/projects/
  language-translator/
    screenshot-1.png
    screenshot-2.png
    screenshot-3.png
  object-detection/
    screenshot-1.png
    screenshot-2.png
```

## Adding screenshots to a project

1. Create `/public/images/projects/<project-id>/` and drop the files in.
2. In `data/projects.js`, give the project an `images` array (any length —
   the card, modal gallery, and lightbox all adapt, and single-image
   projects automatically hide gallery controls):

```js
{
  id: "language-translator",
  title: "Language Translation Tool",
  description: "...",
  images: [
    "/images/projects/language-translator/screenshot-1.png",
    "/images/projects/language-translator/screenshot-2.png",
    "/images/projects/language-translator/screenshot-3.png",
  ],
  tags: ["React", "TypeScript", "FastAPI"],
  liveUrl: "https://...",
  githubUrl: "https://github.com/...",
}
```

3. To feature it on the homepage, also add it to `featuredProjects`
   in the same file.

## Tips

- Prefer `.webp`/`.png` for screenshots, keep each file under ~500KB.
- `next/image` handles optimization and lazy-loading automatically;
  neighbouring gallery images are preloaded for instant prev/next.
- Older entries using the single `image` field keep working untouched —
  migrate them by adding an `images` array whenever ready.

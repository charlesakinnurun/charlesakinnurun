/**
 * Project image helpers.
 *
 * A project may declare its imagery in either of two shapes:
 *
 *   images: ["/projects/dashboard.png", "/projects/login.png"]  // preferred
 *   image:  "/projects/dashboard.png"                           // legacy, still supported
 *
 * `getProjectImages` normalizes both into a deduped array of non-empty
 * strings, so every consumer only ever deals with `string[]` and never has to
 * branch on which shape the data used. Legacy `image` is appended after
 * `images`, and duplicates are removed, so a project can be migrated one
 * image at a time without duplicating the primary asset.
 *
 * @typedef {Object} Project
 * @property {string} title
 * @property {string} [subtitle]
 * @property {string} [description]
 * @property {string} [difficulty]
 * @property {string[]} [images] One or more image paths. Preferred shape.
 * @property {string} [image] Legacy single image path, normalized into `images`.
 * @property {string[]} [tags]
 * @property {string} [link]
 * @property {string} [github]
 */

const toPath = (value) => (typeof value === "string" ? value.trim() : "")

/**
 * Normalized, deduped list of image paths for a project. Always an array —
 * empty when the project declares no imagery.
 *
 * @param {Partial<Project> | null | undefined} project
 * @returns {string[]}
 */
export function getProjectImages(project) {
  if (!project) return []

  const declared = Array.isArray(project.images) ? project.images : []
  const legacy = toPath(project.image)

  return [
    ...new Set(
      [...declared, ...(legacy ? [legacy] : [])].map(toPath).filter(Boolean)
    ),
  ]
}

/**
 * Primary image for a project (the card thumbnail / modal header preview).
 * `images[0]` wins; the legacy `image` is used only when no `images` exist.
 *
 * @param {Partial<Project> | null | undefined} project
 * @returns {string | null}
 */
export function getProjectImage(project) {
  return getProjectImages(project)[0] ?? null
}

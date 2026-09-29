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
 * @property {string} [id]
 * @property {string} [subtitle]
 * @property {string} [description]
 * @property {string} [difficulty]
 * @property {string} [category]
 * @property {string[]} [images] One or more image paths. Preferred shape.
 * @property {string} [image] Legacy single image path, normalized into `images`.
 * @property {string[]} [tags]
 * @property {string[]} [technologies] Alias for `tags`; both are merged.
 * @property {string} [link] Legacy live/demo URL.
 * @property {string} [liveUrl] Live demo URL.
 * @property {string} [github] Legacy repository URL.
 * @property {string} [githubUrl] Repository URL.
 * @property {string} [problem] Problem / motivation.
 * @property {string[]} [features] Key features.
 * @property {string} [contribution] Author's contribution.
 * @property {string} [results] Results / impact.
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

/**
 * Technologies for a project. Merges `tags` and `technologies` (deduped),
 * so entries can use either field.
 *
 * @param {Partial<Project> | null | undefined} project
 * @returns {string[]}
 */
export function getProjectTags(project) {
  if (!project) return []
  const tags = Array.isArray(project.tags) ? project.tags : []
  const technologies = Array.isArray(project.technologies) ? project.technologies : []
  return [...new Set([...tags, ...technologies].map(toPath).filter(Boolean))]
}

/**
 * Live demo URL. `liveUrl` wins; legacy `link` is the fallback.
 *
 * @param {Partial<Project> | null | undefined} project
 * @returns {string | null}
 */
export function getProjectLiveUrl(project) {
  return toPath(project?.liveUrl) || toPath(project?.link) || null
}

/**
 * Repository URL. `githubUrl` wins; legacy `github` is the fallback.
 *
 * @param {Partial<Project> | null | undefined} project
 * @returns {string | null}
 */
export function getProjectGithubUrl(project) {
  return toPath(project?.githubUrl) || toPath(project?.github) || null
}

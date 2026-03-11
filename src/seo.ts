export function setMetaDescription(content: string) {
  if (typeof document === 'undefined') return
  let tag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null
  if (!tag) {
    tag = document.createElement('meta')
    tag.name = 'description'
    document.head.appendChild(tag)
  }
  tag.content = content
}


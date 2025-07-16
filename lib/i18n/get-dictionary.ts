/**
 * Dynamically imports the JSON/TS dictionary for a locale.
 * If the requested locale is missing, it falls back to English.
 *
 * Translation files live in lib/i18n/translations/{locale}.ts
 * and should `export default` an object that matches the
 * Dictionary type below.
 */

type Dictionary = {
  metadata: {
    title: string
    description: string
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export async function getDictionary(locale: string): Promise<Dictionary> {
  try {
    // Vite / Next can tree-shake dynamic imports with variables
    // when the folder structure is known at build time.
    const mod = await import(`./translations/${locale}`)
    return mod.default as Dictionary
  } catch {
    // Fallback: always ensure EN exists
    const mod = await import("./translations/en")
    return mod.default as Dictionary
  }
}

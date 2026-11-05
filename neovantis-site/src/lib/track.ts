// Pushes a named event to the tag manager data layer, only when analytics is configured.
// Only non-personal parameters (speciality, enquiry type, link location) may be passed.
export function track(event: string, params: Record<string, string> = {}) {
  const w = window as unknown as { dataLayer?: unknown[] };
  if (!Array.isArray(w.dataLayer)) return;
  w.dataLayer.push({ event, ...params });
}

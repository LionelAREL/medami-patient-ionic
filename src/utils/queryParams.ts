export const getQueryParam = (name: string): string | null => {
  const search = window?.location?.search ?? '';
  return new URLSearchParams(search).get(name);
}
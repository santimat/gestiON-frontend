export const formatDate = (date: string | Date): string =>
  new Date(date).toLocaleDateString("es-AR");

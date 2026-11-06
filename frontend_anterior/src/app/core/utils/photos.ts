import { Photo } from '../models/afinia.models';

/** URL de la foto principal (o la primera disponible); null si el perfil no tiene fotos. */
export function primaryPhotoUrl(photos: Photo[] | null | undefined): string | null {
  if (!photos || photos.length === 0) {
    return null;
  }
  const primary = photos.find((p) => p.is_primary) ?? photos[0];
  return primary.url;
}

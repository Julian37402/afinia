import { environment } from '../../../environments/environment';

/**
 * Construye la URL absoluta de un endpoint del contrato.
 * Las rutas del contrato ya incluyen /api/v1 (p. ej. '/api/v1/match/my-matches').
 */
export function apiUrl(path: string): string {
  return `${environment.apiBaseUrl}${path}`;
}

/** Copia profunda simple para que los mocks no se muteen entre pantallas. */
export function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

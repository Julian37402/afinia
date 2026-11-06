// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  /**
   * true  → los servicios (core/services) responden con datos mock locales.
   * false → los servicios llaman al backend real con HttpClient.
   * El frontend aún no implementa sesión/JWT, por eso el valor por defecto es true.
   */
  useMocks: true,
  /**
   * URL base del backend, SIN el prefijo /api/v1 (las rutas del contrato ya lo incluyen).
   * Ejemplo con el servidor mock de docs/api/README-INTEGRACION.md: 'http://127.0.0.1:4010'.
   */
  apiBaseUrl: ''
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

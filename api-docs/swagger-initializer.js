window.onload = function () {
  //<editor-fold desc="Changeable Configuration Block">

  // the following lines will be replaced by docker/configurator, when it runs in a docker-container
  window.ui = SwaggerUIBundle({
    urls: [
      {
        name: 'v0: file storage backend',
        url: '../api-definitions/v0.openapi.json',
      },
      { name: 'v1: sqlite backend', url: '../api-definitions/v1.openapi.json' },
      { name: 'utils', url: '../api-definitions/utils.openapi.json' },
    ],
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    plugins: [SwaggerUIBundle.plugins.DownloadUrl],
    layout: 'StandaloneLayout',
    supportedSubmitMethods: [],
    defaultModelsExpandDepth: 2,
  });

  //</editor-fold>
};

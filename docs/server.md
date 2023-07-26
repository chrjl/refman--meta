---
tags:
  - express
  - openapi
  - swaggerui
---

# Logic tier

Express REST API server (connected to [[storage]]/data layer) emulating a subset of features and the design pattern of [Zotero Web API](https://www.zotero.org/support/dev/web_api/v3/).

> **Note**:
> Zotero's Web API (<https://api.zotero.org>) provides access online libraries in Zotero Storage. On the client side, Zotero also provides a [JavaScript API](https://www.zotero.org/support/dev/client_coding/javascript_api) and [direct access to the local SQLite database](https://www.zotero.org/support/dev/client_coding/direct_sqlite_database_access).

| Routes      | Resources                                         | Links                                                                                        |
| ----------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `/api-docs` | Swagger UI (`swagger-ui-express`)                 |                                                                                              |
| `/utils`    | Utility scripts                                   | [[OpenAPI spec]](assets/utils.openapi.json) [[Swagger UI export]](assets/utils.openapi.html) |
| `/v0`       | CRUD API v0: [[json-backend]] &times; `node:fs`   | [[OpenAPI spec]](assets/v0.openapi.json) [[Swagger UI export]](assets/v0.openapi.html)       |
| `/v1`       | CRUD API v1: [[sqlite-backend]] &times; `Knex.js` | [[OpenAPI spec]](assets/v1.openapi.json) [[Swagger UI export]](assets/v1.openapi.html)       |

> **Note:**
> Locally spin up a server with sample data to test requests from Swagger UI.

## API documentation

`/api-docs` : Swagger UI

OAS documents are expected to be served on endpoints relative to the API functionality that they describe, i.e. `/v0/openapi.json`, and are loaded from internal URLs. See: ["Load swagger from url"](https://github.com/scottie1984/swagger-ui-express#load-swagger-from-url) in `swagger-ui-express` documentation.

## Utility scripts

`/utils` route

| Endpoint        | Utility                                        |
| --------------- | ---------------------------------------------- |
| `/openapi.json` | OpenAPI specification for `/utils` route       |
| `/metadata`     | URL metadata scraper (see: [[utils-metadata]]) |

## CRUD API

### API versions (storage backends)

|    Status    | Route root |                                      |
| :----------: | :--------- | ------------------------------------ |
| - [x] &nbsp; | `/v0`      | [[json-backend]] &times; `node:fs`   |
| - [ ] &nbsp; | `/v1`      | [[sqlite-backend]] &times; `Knex.js` |

### API Routes

> **Note:**
> Not all routes are implemented on all storage backend branches. See the Swagger UI export for detailed documentation.

| Resource                | Description                            | Methods                         |
| ----------------------- | -------------------------------------- | ------------------------------- |
| `/openapi.json`         | OpenAPI specification                  | `GET`                           |
| `/items`                | Items in the collection                | `GET`, `POST`, `DELETE`         |
| `/items/{itemKey}`      | A specific item in the collection      | `GET`, `PUT`, `PATCH`, `DELETE` |
| `/items/{itemKey}/tags` | Keywords referenced by a specific item | `GET`, `PATCH`, `DELETE`        |
| `/items/trash`          | Trashed items                          | `GET`, `DELETE`                 |
| `/tags`                 | Keywords referenced in the collection  | `GET`, `DELETE`                 |
| `/tags/{tag}`           | Keyword operations                     | `POST`                          |

#### Format of data returned from read requests

Formatting of data returned from read (`GET`) requests can be requested using the `format` query parameter.

```console
$ http /items format==archive #httpie
$ curl localhost:3000/items?format=json
```

Details on implementation and supported formats may depend on the storage backend.

| Parameter | Description                                                                     |
| --------- | ------------------------------------------------------------------------------- |
| `json`    | Returns inline json.                                                            |
| `archive` | Returns an attachment whose file type and content depend on the storage backend |

> **Note:**
> Details on archive
>
> - The file type is returned in the `Content-Type` header
> - A default file name is return in the `Content-Disposition` header
> - Attachment (vs. inline) behavior is also set in the `Content-Disposition` header

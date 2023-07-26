---
tags:
  - node:fs
---

# JSON object storage backend

## Data tier

Flat storage of items as JSON objects. CRUD operations a performed via filesystem operations.

- Each collection is stored as a flat directory.
- Each item is stored as a JSON object file. The filename serves as the item's primary `key`, and can be set to coincide with the item's BibLaTeX `ids` field.
- Keywords are stored local to each item.

Before queries can be performed (or map-reduce operations using JavaScript array methods), all files in the collection need to be read, parsed, and placed in the app's object storage.

## API server

Performs CRUD operations using `node:fs` module to perform read and write operations on the `json-storage` collection directory.

### Implemented routes

> **Note:**
> View the [OpenAPI specification](assets/v0.openapi.json) or an export of the [Swagger UI](https://github.com/chrjl).

| Route                   | Method                          |
| ----------------------- | ------------------------------- |
| `/openapi.json`         |                                 |
| `/items`                | `GET`, `POST`, `DELETE`         |
| `/items?format=archive` | `GET`                           |
| `/items/{itemKey}`      | `GET`, `PUT`, `PATCH`, `DELETE` |

Requests include the item's `key` field, as each item is stored as a JSON object with its file name serving as primary key. It is important to validate and sanitize requests to block attempts at [path traversal](https://www.stackhawk.com/blog/node-js-path-traversal-guide-examples-and-prevention/) by confining operations to the `collection` (and `Trash`) directories.

### Archive export

A gzipped tar archive (`.tgz`) is returned when an archive is requested.

- `Content-Type` header is set to `application/x-tar-gz`
- `Content-Disposition` header is set to indicate attachment and filename.
- The `node-tar` package is utilized to create an archive of all `.json` files in the collection directory, returning a readable stream.
- The readable stream is piped to the `ServerResponse`.

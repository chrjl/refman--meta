# `refman`

This is a bespoke CRUD app to store, tag, and retrieve a bibliography of resources, inspired by [Zotero](https://www.zotero.org/) [^zotero-references].

I am piecewise building this as an exercise in skills acquired in web development and JavaScript tooling, while also actively using this app to database the resources (mainly blog entries and tutorials) that I have been learning from.

## Architecture

### Multi-tier architecture

The app is separated into components according to the generic [three-tier architecture pattern](https://docs.aws.amazon.com/whitepapers/latest/serverless-multi-tier-architectures-api-gateway-lambda/three-tier-architecture-overview.html). Follow the links to read more about each component and the different iterations they have respectively gone through.

- Data tier/[[storage]] (([[repo]](http://github.com/chrjl/refman--data-layer))
  : intended to flexibly follow the BibLaTeX model.

- Logic tier/[[server]] ([[repo]](http://github.com/chrjl/refman--server))
  : REST API server connected to the data tier.

- Presentation tier/[[client]] ([[repo]](http://github.com/chrjl/refman--client))

### Storage backends

There are a couple of different storage backends implemented, each with a corresponding API server implementation.

- [x] `v0`: [[json-backend]] ([[OpenAPI spec]](assets/v0.openapi.json) [[Swagger UI export]](assets/v0.openapi.html))

  Items are stored as individual JSON objects in a flat directory.

  The storage directory is mounted directly to the API server, and CRUD operations are performed as filesystem operations.

- [ ] `v1`: [[sqlite-backend]] ([[OpenAPI spec]](assets/v1.openapi.json) [[Swagger UI export]](assets/v1.openapi.html))

  Items and keywords are stored in a SQLite database. `Knex.js` migrations and seeds and utilized to migrate data from the JSON object storage branch.

  The SQLite database is mounted directly to the API server, and CRUD operations are coded using the `knex.js` query builder. #express #knex

## Deployment

- [ ] Reference deployment using `docker compose`

---

Next steps: [[planning]]

[^zotero-references]:
    More useful notes on Zotero and projects to pull inspiration from:

    - <https://github.com/MunGell/ZotServer>
    - <https://github.com/foxsen/zotero-selfhost>

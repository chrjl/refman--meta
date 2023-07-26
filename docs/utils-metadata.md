---
tags:
  - opengraph
  - metadata
---

# Metadata scraper script

Uses the [`metadata-scraper`](https://github.com/BetaHuhn/metadata-scraper) package to fetch and scrape the site title, author, keywords, and other metadata from a URL (or pre-provided HTML string, in which case it does not make a HTTP request).

The package is itself based on Mozilla's (deprecated) [`page-metadata-parser`](https://github.com/mozilla/page-metadata-parser) library, which parses the metadata for Open Graph properties, Twitter Card tags, and generic HTML meta tags.

## Rules

The `metadata-scraper` library fetches a URL using `got` and parses the DOM using `domino`, then follows a set of rules to process the scraped metadata into an informative summary.

This app further reshapes the metadata received from `metadata-scraper`, following a set of its own rules to better match the desired schema described in [[storage]].

- Filter out `undefined` fields
- Rename `type` to `entrysubtype`
- Rename `published` to `date`
- Rename `provider` to `publisher` and change type from string to array
- Change type of `author` from string to array

## Usage

The metadata summary is requested via GET request to the script's endpoint, with the url included as a query parameter. The returned JSON can be piped into other utilities (i.e. `jq`, `ijq`) for further processing:

```console
$ curl localhost:3000/utils/metadata?url=http://developer.mozilla.org | jq '{title, author, url, type: "online"}'
{
  "title": "MDN Web Docs",
  "author": [
    "MozDevNet"
  ],
  "url": "https://developer.mozilla.org",
  "type": "online"
}
```

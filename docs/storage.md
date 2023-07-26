# Data tier

## Item schema

No schema is enforced, but items are intended to follow the [BibLaTeX specification](https://linorg.usp.br/CTAN/macros/latex/contrib/biblatex/doc/biblatex.pdf).

The following are required fields, stored as lists. This is a deviation from the BibLaTeX specification (which treat them as separated value 'special' field types).

- `ids` (list)
- `keywords` (list)

The following are intuitively suggested 'required' fields:

- `type`, `entrysubtype`

  I am anticipating that the vast majority of items will be of the `@online` type, where the `entrysubtype` field can be utilized for finer-grained description (i.e. tutorial, blog, article). Other types I anticipate are `@book`, `@article`, and `@manual`.

- `author`, and `publisher` (lists)
- `title`
- `url`
- `date` (issued date)
- `urldate` (accessed date)

## File storage

The data storage in the following sections needs to be read/write mounted directly onto the API server for CRUD manipulation. Version numbers refer to the version of the API [[server]]. There are two collections: `collection` and `Trash`.

### Storage backend versions

- [x] `v0`: [[json-backend]]
- [ ] `v1`: [[sqlite-backend]]

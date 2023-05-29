---
sidebar_position: 2
---

# Markdown reference

Reference:
1. https://www.markdownguide.org/extended-syntax/

---
## BlockQuotes

Single line quote 

```
> This is quote
```

> This is quote


Multiline Quote

```
> This is quote
>
> This is quote
```
> This is quote
>
> This is quote

Table in blockquote
```
> | Header | Title |
>| --- | ----------- |
>| Paragraph1 | Text |
>| Paragraph 2| Text |
>| Paragraph3 | Text |
>| Paragraph 4 | Text |
```

> | Header | Title |
>| --- | ----------- |
>| Paragraph1 | Text |
>| Paragraph 2| Text |
>| Paragraph3 | Text |
>| Paragraph 4 | Text |
---

## Table
```
| Syntax | Description |
| --- | ----------- |
| Header | Title |
| Paragraph | Text |
```
*Output*

| Syntax | Description |
| --- | ----------- |
| Header | Title |
| Paragraph | Text |


---

Table Alignment

```
| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |
```

*Output*

| Syntax      | Description | Test Text     |
| :---        |    :----:   |          ---: |
| Header      | Title       | Here's this   |
| Paragraph   | Text        | And more      |

---

Create a Markdown file at `docs/hello.md`:

```md title="docs/hello.md"
# Hello

This is my **first Docusaurus document**!
```

A new document is now available at [http://localhost:3000/docs/hello](http://localhost:3000/docs/hello).

## Configure the Sidebar

Docusaurus automatically **creates a sidebar** from the `docs` folder.

Add metadata to customize the sidebar label and position:

```md title="docs/hello.md" {1-4}
---
sidebar_label: 'Hi!'
sidebar_position: 3
---

# Hello

This is my **first Docusaurus document**!
```

It is also possible to create your sidebar explicitly in `sidebars.js`:

```js title="sidebars.js"
module.exports = {
  tutorialSidebar: [
    'intro',
    // highlight-next-line
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
};
```

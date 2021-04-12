# hugo-shortcode-extended-markdown-table

> Hugo shortcode for tables supporting colspan/rowspan.

This shortcode allow you to write a markdown table in [Extended syntax of shd101wyy/markdown-preview-enhanced](https://shd101wyy.github.io/markdown-preview-enhanced/#/markdown-basics?id=table).

## Restriction

Not support `empty_cell` representing colspan with left cell.

## Usage

### Install

Clone this repository under `themes/` directory (or make submodule).

```console
$ cd themes
$ git submodule add https://github.com/wataru-chocola/hugo-shortcode-extended-markdown-table
$ git submodule update --init --recurseive
```

### Enable shortcode

Add this shortcode to `theme:` directive in your site config like:

```yaml
theme:
  - "hugo-shortcode-extended-markdown-table"
  - "docsy"
```

and put `script` tag to load js.
For example, if you use `docsy` theme, write the following line in `layouts/partials/hooks/body-end.html`.

```html
<script src='{{ "/js/extended-markdown-table.js" | relURL }}'></script>
```


### Write your table

Wrap your table with `extended-markdown-table` shortcode.

```markdown
colspan `>`:

{{< extended-markdown-table >}}
| a | b |
|---|---|
| > | 1 |
{{< /extended-markdown-table >}}

rowspan `^`:

{{< extended-markdown-table >}}
| a | b |
|---|---|
| 1 | 2 |
| ^ | 4 |
{{< /extended-markdown-table >}}
```

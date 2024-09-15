# HTMF (Hypertext Markup Functions) v0.0.1 alpha

```javascript
new HTMF()
  .h1("Click me").get("example.com/products")
    .div((product) => p.name)._div()
    .div((product) => p.price).css("text-green-500")
  .render();
```
```html
<h1 onclick={fetch("example.com/products", "qL3eXYC1")}>
  Click me
  <template id="qL3eXYC1">
    <div>Giftcard</div>
    <div class="text-green-500">20$</div>
  <template>
</h1>
```

```javascript
new HTMF()
  .h1("Hello")
    .div("World")
  .render();
```
```html
<h1>
  Hello
  <div>World<div>
</h1>
```

```javascript
const htmf = new HTMF();
const result = htmf
  .div()
    .h1("Nested Heading")
    ._end()
  .end()
  .div("Showcase:")
    .div()
      .h1("Title")
      ._close()
  .h1("cool")
  .render();
```
```html
<div>
  <h1>Nested heading<h1>
</div>
<div>
  Showcase:
  <div>
    <h1>Title</h1>
  </div>
</div>
<h1>cool</h1>
```

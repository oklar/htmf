# HTMF (Hypertext Markup Functions) v0.0.1 alpha

```javascript
new HTMF()
  .h1("Click me").get("example.com/products")
    .div((product) => product.name)._div()
    .div((product) => product.price).css("text-green-500")
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
const listOfProducts = new HTMF()
  .get("example.com/products")
    .div((product) => product.name)._close()
    .div((product) => product.price).css("text-green-500")._close()
    .div("Buy now")
      .post((product) => `example.com/cart/${product.id}`)
        .h1("Added to cart!");

const html = new HTMF()
  .div("Click me").trigger(listOfProducts)._close()
  .div("This is a list of products:").target(listOfProducts)._close()
  .h1("Above is a list of products")
  .render();
```
```html
<template id="qL3eXYC1">
  <div t="name"><div>
  <div t="price" class="text-green-500"><div>
  <div onclick={post("example.com/cart", "kaU01xUR", "id")}>Buy now</div>
</template>
<template id="kaU01xUR">
  <h1>Added to cart!</h1>
</template>

<div onclick={fetch("example.com/products", "qL3eXYC1")}>
  Click me
</div>
<div hf-target="qL3eXYC1">This is a list of products:</div>
<h1>Above is a list of products<h1>
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

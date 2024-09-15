import { describe, it, expect } from "vitest";
import { HTMF } from "../htmf"; // Adjust the path

describe("HTMLBuilder", () => {
  it("should create an h1 element with text", () => {
    const builder = new HTMF();
    const result = builder.h1("Hello World").render();

    expect(result).toBe("<h1>Hello World</h1>");
  });

  it("should create a div with a class and text", () => {
    const builder = new HTMF();
    const result = builder.div("This is a div").css("my-class").render();

    expect(result).toBe('<div class="my-class">This is a div</div>');
  });

  // it("should handle templates and data binding", () => {
  //   const builder = new HTMLBuilder();
  //   const template = builder
  //     .template("item-template")
  //     .div((item) => `Item: ${item.name}`)
  //     ._div()
  //     .render();

  //   expect(template).toContain('<template id="item-template">');
  // });
});

describe("HTMLBuilder nesting", () => {
  it("should nest div and h1 elements correctly by not closing any tags", () => {
    const builder = new HTMF();
    const result = builder.div().h1("Nested Heading").render();

    expect(result).toBe("<div><h1>Nested Heading</h1></div>");
  });

  it("should nest div and h1 elements correctly by being verbose", () => {
    const builder = new HTMF();
    const result = builder.div().h1("Nested Heading")._h1()._div().render();

    expect(result).toBe("<div><h1>Nested Heading</h1></div>");
  });

  it("should nest div and h1 elements correctly by using end", () => {
    const builder = new HTMF();
    const result = builder
      .div()
      .h1("Nested Heading")
      ._h1()
      ._div()
      ._end()
      .render();

    expect(result).toBe("<div><h1>Nested Heading</h1></div>");
  });

  it("should nest div and h1 elements correctly by removing last div", () => {
    const builder = new HTMF();
    const result = builder.div().h1("Nested Heading")._h1().render();

    expect(result).toBe("<div><h1>Nested Heading</h1></div>");
  });

  it("should nest div and h1 elements correctly by removing last div and using end", () => {
    const builder = new HTMF();
    const result = builder.div().h1("Nested Heading")._h1()._end().render();

    expect(result).toBe("<div><h1>Nested Heading</h1></div>");
  });

  it("should nest div and h1 elements correctly and adding new div outside", () => {
    const builder = new HTMF();
    const result = builder
      .div()
      .h1("Nested Heading")
      ._h1()
      ._div()
      .div("test")
      .render();

    expect(result).toBe("<div><h1>Nested Heading</h1></div><div>test</div>");
  });
});

describe("HTMLBuilder end() multiple times", () => {
  it("should be gracefully closed", () => {
    const builder = new HTMF();
    const result = builder
      .div()
      .h1("Nested Heading")
      ._h1()
      ._div()
      .div("test")
      ._end()
      ._end()
      ._end()
      .render();

    expect(result).toBe("<div><h1>Nested Heading</h1></div><div>test</div>");
  });
});

describe("HTMLBuilder close()", () => {
  it("should close a deep nested div", () => {
    const builder = new HTMF();
    const result = builder
      .div()
      .h1("Nested Heading")
      ._h1()
      .div("test")
      .div("test2")
      ._close()
      .h1("test3")
      .render();

    expect(result).toBe(
      "<div><h1>Nested Heading</h1><div>test<div>test2</div></div></div><h1>test3</h1>"
    );
  });
});

describe("HTMLBuilder close() multiple times", () => {
  it("should be gracefully closed", () => {
    const builder = new HTMF();
    const result = builder
      .div()
      .h1("Nested Heading")
      ._h1()
      .div("test")
      .div("test2")
      ._close()
      .h1("test3")
      ._close()
      ._close()
      ._close()
      .render();

    expect(result).toBe(
      "<div><h1>Nested Heading</h1><div>test<div>test2</div></div></div><h1>test3</h1>"
    );
  });
});

# parcel-plugin-imba

This plugin enables [Parcel](https://parceljs.org/) to process `.imba` files

You can use the plugin in your project like this:

```sh
npm i -D parcel-bundler parcel-plugin-imba
```

Now, you can import `.imba` files in your HTML or javascript.

I also like to setup a couple scripts in my `package.json`:

```json
{
  "scripts": {
    "build": "parcel build src/index.html",
    "start": "parcel src/index.html"
  }
}
```

and import the entrypoint in `src/index.html`:

```html
<body></body>
<script src="./index.imba"></script>
```
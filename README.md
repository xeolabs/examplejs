Easily organise your API examples with this tag-searchable example browser.

### 1. Get your example pages together
Start with a bunch of HTML example pages that demo the various features of your API,
[like these ones from SceneJS 3.1](https://github.com/xeolabs/scenejs/tree/V3.1/examples/ex). Note that we don't have to
change those any any way. ExampleJS is non-invasive and is to use in addition to your existing examples pages, as an index.

### 2. Make an index file
Make a JSON index that references those pages and gives them display names and searchable tags,
 [like this one](https://github.com/xeolabs/scenejs/blob/V3.1/examples/ex/index.json).

### 3. Make your catalogue page
Make an HTML page which contains an instance of ExampleJS, linking to ExampleJS library and the JSON index, like
[this one](https://github.com/xeolabs/scenejs/blob/V3.1/examples.html).

### 4. Load that catalogue page
Voila, examples nicely laid out and indexed with searchable tags, [like this one](http://scenejs.org/examples.html)

### How does it work?
The ExampleJS library is served off github pages, which is fairly reliable. In the catalogue page, we load the lib and
make an instance of it configured to load our example pages using those absolute URLs you see in the JSON index.

The examples browser is rebadgable with different logo - see example in (3) for the configs.

License is GPL and MIT.

I hope this enhances productively for your project, as it does for the [SceneJS](http://scenejs.org) project.
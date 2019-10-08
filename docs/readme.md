## Getting started

You need:

* `node 10+`
* `yarn 1.13.0`

Posts are written in markdown. You can use any markdown editor you like. [vscode's markdown all in one](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) plugin is very good for rich editing markdown files. Follow our [markdown style guide](docs/markdown.md).

To update the blog you must [fork the repository](https://help.github.com/en/articles/fork-a-repo) and submit a pull request across the forks.

## Authoring a new post

To author a new post run `yarn new:post "Your Post Name Here"` a directory, and markdown file will be created for you in `content/blog/Your-Post-Name-Here`

Then you can author the post as normal with markdown. To run the server locally, run `yarn install && yarn start` at which point you should be able to see the blog at [http://localhost:8000/](http://localhost:8000/)

Our CI system checks for spelling errors, you can run this yourself with `yarn check:spell`, you will be prompted to either fix your mistakes or add your mistakes to a dictionary. You can add yourself to `authors/authors.json`, with some basic info about yourself, and a thumbnail can be placed in `content/assets/authors`.

## LaTeX

We use [Katex](https://katex.org/) as our math typesetting library. Katex has a [large table](https://katex.org/docs/supported.html) of supported functions, and [environments](https://katex.org/docs/supported.html#environments).

There are two modes to authoring equations `inline` and `display` 

Inline uses a single opening/closing `$` and will inline the function.

`$a^2 + b^2 = c^2$`

Display mode will center and block the equations, those are wrapped in opening/closing `$$` with a new line.

```
$$
a^2 + b^2 = c^2
$$
```




## Getting your post published

To get a new post published on the live site, submit a pull request from your fork. (Any new content must be approved by @stodesca - github will enforce this automatically with its codeowner system.) Netlify will automatically pick up approved commits to master and deploy them to the blog's public website.


## Editing the code

To start the blog locally run `yarn install` and then run `yarn start`. The blog itself supports hot module reloading, so most changes you make should automatically apply in the browser. 

We use [less](http://lesscss.org/) as our css processor, and [css modules](https://github.com/css-modules/css-modules) to import our styles into our components. Each component should have a less file with the name of `component.module.less`. Note the `.module` for gatsby to understand a less file is a css module you have to have the `.module` otherwise your styles won't get imported.

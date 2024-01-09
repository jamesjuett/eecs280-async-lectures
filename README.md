# eecs280-async-lectures

A set of asynchronous lectures for EECS 280 at the University of Michigan - Ann Arbor. Written and maintained by James Juett.

Please feel free to report typos, bugs, etc. via the issue tracker.

Or, if you have a suggestion for improving these lectures, I'd like to hear about that too!

## Manually Bundling Lobster Exercises

For example:

```console
npx webpack ./src/intset_insert.ts --config ../../lobster/webpack.config.js
```

Then, manually rename `main.html` and `main.js` to e.g. `intset_insert.html` and `intset_insert.js`. Change the source include at the top of `intset_insert.html` appropriately.
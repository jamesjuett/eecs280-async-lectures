# eecs280-async-lectures

A set of asynchronous lectures for EECS 280 at the University of Michigan - Ann Arbor. Written and maintained by James Juett.

Please feel free to report typos, bugs, etc. via the issue tracker.

Or, if you have a suggestion for improving these lectures, I'd like to hear about that too!

## Local Preview
Run `npm install` in the top level directory (first time only).

Run `npm run build` in the top level directory.

Then, run a local web server in `lectures/out`, e.g.:

```console
cd lectures/out
python3 -m http.server 8000
```

## Manually Bundling Lobster Exercises

If you make changes to the Lobster exercises, rerun the script to bundle them:

```console
./make_embedded.sh
```
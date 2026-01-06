# Contributing

These instructions are for EECS 280 instructors.

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
#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const files = [
  {
    file: path.join(process.cwd(), "node_modules", "next", "dist", "build", "swc", "index.js"),
    logObject: "_log"
  },
  {
    file: path.join(process.cwd(), "node_modules", "next", "dist", "esm", "build", "swc", "index.js"),
    logObject: "Log"
  }
];

const asyncOriginalSnippet = `            attempts = attempts.concat(a);
        }
        logLoadFailure(attempts, true);`;

const syncOriginalSnippet = `function loadBindingsSync() {
    let attempts = [];
    try {
        return loadNative();
    } catch (a) {
        attempts = attempts.concat(a);
    }
    // we can leverage the wasm bindings if they are already
    // loaded
    if (wasmBindings) {
        return wasmBindings;
    }
    logLoadFailure(attempts);
}`;

const wasmImportOriginalSnippet = `            let bindings = await import((0, _url.pathToFileURL)(pkgPath).toString());`;
const wasmImportEsmOriginalSnippet = `            let bindings = await import(pathToFileURL(pkgPath).toString());`;
const wasmImportReplacementSnippet = `            let bindings = importPath ? await import((0, _url.pathToFileURL)(pkgPath).toString()) : await import(pkgPath);`;
const wasmImportEsmReplacementSnippet = `            let bindings = importPath ? await import(pathToFileURL(pkgPath).toString()) : await import(pkgPath);`;

function buildAsyncReplacement() {
  return `            attempts = attempts.concat(a);
        }
        {
            const fallbackBindings = await tryLoadWasmWithFallback(attempts);
            if (fallbackBindings) {
                return resolve(fallbackBindings);
            }
        }
        logLoadFailure(attempts, true);`;
}

function buildSyncReplacement(logObject) {
  return `function loadBindingsSync() {
    let attempts = [];
    try {
        return loadNative();
    } catch (a) {
        attempts = attempts.concat(a);
    }
    // we can leverage the wasm bindings if they are already
    // loaded
    if (wasmBindings) {
        return wasmBindings;
    }
    try {
        const bindings = require("@next/swc-wasm-nodejs");
        wasmBindings = {
            isWasm: true,
            transform (src, options) {
                return Promise.resolve(bindings.transformSync(src.toString(), options));
            },
            transformSync (src, options) {
                return bindings.transformSync(src.toString(), options);
            },
            minify (src, options) {
                return Promise.resolve(bindings.minifySync(src.toString(), options));
            },
            minifySync (src, options) {
                return bindings.minifySync(src.toString(), options);
            },
            parse (src, options) {
                return Promise.resolve(bindings.parseSync(src.toString(), options));
            },
            parseSync (src, options) {
                return bindings.parseSync(src.toString(), options);
            },
            getTargetTriple () {
                return undefined;
            },
            turbo: {
                startTrace: ()=>{
                    ${logObject}.error("Wasm binding does not support trace yet");
                },
                entrypoints: {
                    stream: (turboTasks, rootDir, applicationDir, pageExtensions, callbackFn)=>{
                        return bindings.streamEntrypoints(turboTasks, rootDir, applicationDir, pageExtensions, callbackFn);
                    },
                    get: (turboTasks, rootDir, applicationDir, pageExtensions)=>{
                        return bindings.getEntrypoints(turboTasks, rootDir, applicationDir, pageExtensions);
                    }
                }
            },
            mdx: {
                compile: (src, options)=>bindings.mdxCompile(src, getMdxOptions(options)),
                compileSync: (src, options)=>bindings.mdxCompileSync(src, getMdxOptions(options))
            }
        };
        pendingBindings = Promise.resolve(wasmBindings);
        return wasmBindings;
    } catch (error) {
        attempts = attempts.concat([
            \`Attempted to load @next/swc-wasm-nodejs in sync mode, but an error occurred: \${error.message ?? error}\`
        ]);
    }
    logLoadFailure(attempts, true);
}`;
}

function patchFile({ file, logObject }) {
  if (!fs.existsSync(file)) {
    console.warn(`[patch-next-swc] Target file not found: ${file}`);
    return false;
  }

  const source = fs.readFileSync(file, "utf8");
  let updated = source;

  if (!updated.includes('Attempted to load @next/swc-wasm-nodejs in sync mode')) {
    if (updated.includes(syncOriginalSnippet)) {
      updated = updated.replace(syncOriginalSnippet, buildSyncReplacement(logObject));
    } else {
      console.warn(`[patch-next-swc] Sync snippet not found in ${file}`);
    }
  }

  const asyncPatchMarker =
    "attempts = attempts.concat(a);\n        }\n        {\n            const fallbackBindings = await tryLoadWasmWithFallback(attempts);";

  if (!updated.includes(asyncPatchMarker)) {
    if (updated.includes(asyncOriginalSnippet)) {
      updated = updated.replace(asyncOriginalSnippet, buildAsyncReplacement());
    } else {
      console.warn(`[patch-next-swc] Async snippet not found in ${file}`);
    }
  }

  if (file.endsWith(path.join("dist", "build", "swc", "index.js"))) {
    if (updated.includes(wasmImportOriginalSnippet)) {
      updated = updated.replace(wasmImportOriginalSnippet, wasmImportReplacementSnippet);
    }
  }

  if (file.endsWith(path.join("dist", "esm", "build", "swc", "index.js"))) {
    if (updated.includes(wasmImportEsmOriginalSnippet)) {
      updated = updated.replace(wasmImportEsmOriginalSnippet, wasmImportEsmReplacementSnippet);
    }
  }

  if (updated !== source) {
    fs.writeFileSync(file, updated, "utf8");
    console.log(`[patch-next-swc] Patched ${path.relative(process.cwd(), file)}`);
    return true;
  }

  console.log(`[patch-next-swc] Already patched ${path.relative(process.cwd(), file)}`);
  return false;
}

function main() {
  let changed = false;

  for (const descriptor of files) {
    if (patchFile(descriptor)) {
      changed = true;
    }
  }

  if (!changed) {
    console.log("[patch-next-swc] No file changes needed.");
  }
}

main();

#!/usr/bin/env node

async function warmupSwcWasm() {
  try {
    const swc = require("next/dist/build/swc");
    await swc.isWasm();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`[next-with-wasm] SWC wasm warmup skipped: ${message}`);
  }
}

async function main() {
  await warmupSwcWasm();
  require("next/dist/bin/next");
}

main();

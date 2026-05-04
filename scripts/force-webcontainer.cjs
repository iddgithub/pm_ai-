try {
  if (!process.versions.webcontainer) {
    Object.defineProperty(process.versions, "webcontainer", {
      value: "1",
      configurable: true
    });
  }
} catch (error) {
  console.warn(`[force-webcontainer] ${error.message}`);
}

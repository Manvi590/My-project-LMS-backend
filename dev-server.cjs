// Small CommonJS dev server that imports the ESM app and starts listening
(async () => {
  try {
    const { default: app } = await import('./index.mjs');
    const PORT = process.env.PORT || 8089;
    app.listen(PORT, () => console.log(`✅ Dev server listening on http://localhost:${PORT}`));
  } catch (err) {
    console.error('Failed to start dev server:', err);
    process.exit(1);
  }
})();

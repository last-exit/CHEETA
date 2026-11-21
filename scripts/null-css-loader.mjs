export async function resolve(specifier, context, defaultResolve) {
  if (specifier.endsWith('.css') || specifier.includes('.css?')) {
    return {
      url: specifier.startsWith('file:') ? specifier : new URL(specifier, context.parentURL).href,
      shortCircuit: true,
      format: 'module',
    };
  }
  return defaultResolve(specifier, context, defaultResolve);
}

export async function load(url, context, defaultLoad) {
  if (url.endsWith('.css') || url.includes('.css?')) {
    return {
      format: 'module',
      shortCircuit: true,
      source: 'export default {};',
    };
  }
  return defaultLoad(url, context, defaultLoad);
}

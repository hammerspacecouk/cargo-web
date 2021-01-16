export const isClient = typeof window !== "undefined" && typeof window.document !== "undefined";

export const isServer = typeof process !== "undefined" && process.versions != null && process.versions.node != null;

export const clientPath = isClient ? window.location.pathname : "";

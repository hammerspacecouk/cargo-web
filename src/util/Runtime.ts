const isClient =
  typeof window !== "undefined" && typeof window.document !== "undefined";

const isServer =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null;

export { isClient, isServer };

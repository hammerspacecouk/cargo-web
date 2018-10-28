import { KeyValueInterface } from "../interfaces/KeyValueInterface";

export default class {
  private assets?: KeyValueInterface;
  private staticPrefix: string;

  constructor(assets: KeyValueInterface, staticPrefix: string) {
    this.assets = assets;
    this.staticPrefix = staticPrefix;
  }

  get(asset: string): string {
    if (this.assets && asset in this.assets) {
      return this.staticPrefix + this.assets[asset];
    }
    return "/" + asset;
  }

  getKeys(): string[] {
    if (this.assets) {
      return Object.keys(this.assets);
    }
    return [];
  }

  getAll(): KeyValueInterface {
    return this.assets;
  }

  getJSON(): string {
    return JSON.stringify(this.assets);
  }
}

import { IKeyValue } from "../Interfaces";

export class Assets {
  private readonly assets?: IKeyValue;
  private readonly staticPrefix: string;

  constructor(assets: IKeyValue, staticPrefix: string) {
    this.assets = assets;
    this.staticPrefix = staticPrefix;
  }

  public get(asset: string): string {
    if (this.assets && asset in this.assets) {
      return this.staticPrefix + this.assets[asset];
    }
    return "/" + asset;
  }

  public getKeys(): string[] {
    if (this.assets) {
      return Object.keys(this.assets);
    }
    return [];
  }

  public getAll(): IKeyValue {
    return this.assets;
  }

  public getJSON(): string {
    return JSON.stringify(this.assets);
  }
}

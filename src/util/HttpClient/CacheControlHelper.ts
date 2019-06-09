interface ICacheControl {
  [key: string]: any;
}

export class CacheControlHelper {
  private readonly parsed: ICacheControl;

  constructor(field: string) {
    /*
          Cache-Control   = 1#cache-directive
          cache-directive = token [ "=" ( token / quoted-string ) ]
          token           = [^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+
          quoted-string   = "(?:[^"\\]|\\.)*"
        */

    //                             1: directive                                        =   2: token                                              3: quoted-string
    const regex = /(?:^|(?:\s*\,\s*))([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)(?:\=(?:([^\x00-\x20\(\)<>@\,;\:\\"\/\[\]\?\=\{\}\x7F]+)|(?:\"((?:[^"\\]|\\.)*)\")))?/g;

    const header: { [key: string]: any } = {};
    const err = field.replace(regex, ($0: string, $1: string, $2?: string, $3?: string) => {
      const value = $2 || $3;
      header[$1] = value ? value.toLowerCase() : true;
      return "";
    });

    if (header["max-age"]) {
      const maxAge = parseInt(header["max-age"], 10);
      if (isNaN(maxAge)) {
        return null;
      }

      header["max-age"] = maxAge;
    }

    this.parsed = header;
  }

  public getMaxAge() {
    return this.parsed["max-age"];
  }

  public getExpires(now: number) {
    return now + this.getMaxAge() * 1000;
  }

  public isCacheable() {
    return !this.parsed["no-cache"];
  }
}

interface CacheControl {
  [key: string]: any;
}

export class CacheControlHelper {
  private readonly parsed: CacheControl;

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
    const err = field.replace(
      regex,
      ($0: string, $1: string, $2?: string, $3?: string) => {
        const value = $2 || $3;
        header[$1] = value ? value.toLowerCase() : true;
        return "";
      }
    );

    if (header["max-age"]) {
      try {
        const maxAge = parseInt(header["max-age"], 10);
        if (isNaN(maxAge)) {
          return null;
        }

        header["max-age"] = maxAge;
      } catch (err) {}
    }

    this.parsed = header;
  }

  getMaxAge() {
    return this.parsed["max-age"];
  }

  getExpires(now: number) {
    return now + this.getMaxAge() * 1000;
  }

  isCacheable() {
    return !this.parsed["no-cache"];
  }
}

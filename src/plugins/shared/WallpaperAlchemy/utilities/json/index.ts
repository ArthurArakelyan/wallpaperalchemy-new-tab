class Json {
  stringify(value: any, spaces = 0): string {
    try {
      return JSON.stringify(value, undefined, spaces);
    } catch (error) {
      console.error(error);

      return "";
    }
  }

  parse<T = any>(text: string | null): T | null {
    try {
      if (!text) {
        return null;
      }

      return JSON.parse(text);
    } catch (error) {
      console.error(error);

      return null;
    }
  }
}

const json = new Json();

export default json;

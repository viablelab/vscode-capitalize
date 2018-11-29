declare module 'title' {
  interface Options {
    special?: string[];
  }

  function title(str: string, options?: Options): string;

  export = title;
}

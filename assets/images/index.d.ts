// [How to import images in Typescript • Today I Learned](https://graffino.com/til/how-to-import-images-in-typescript)
declare module "*.png" {
  const value: any;
  export = value;
}

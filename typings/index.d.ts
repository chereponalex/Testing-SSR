declare module "*.svg" {
  const content: string
  export default content
}

declare module "*.png" {
  const content: string
  export default content
}

declare interface NodeModule {
  hot: {
    accept(path?: string, cb?: () => void): void
  }
}

declare interface Window {
  __INITIAL_STATE__: {}
  env: {
    [key: string]: string
  }
}

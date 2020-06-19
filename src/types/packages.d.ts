declare interface NodeModule {
  hot: {
    accept(): void;
    dispose(Function): void;
  };
}

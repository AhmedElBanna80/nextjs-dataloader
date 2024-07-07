import DataLoader, { BatchLoadFn } from "dataloader";

export interface ILoader<K, V> {
  load(key: K): Promise<V>;
  loadMany(keys: K[]): Promise<Array<V | Error>>;
}

export abstract class AbstractDataLoader<K, V> implements ILoader<K, V> {
  private _loader: DataLoader<K, V> | undefined;

  protected get loader(): DataLoader<K, V> {
    if (!this._loader) {
      this._loader = new DataLoader<K, V>(this.batchLoadFunction, {});
    }
    return this._loader;
  }

  abstract batchLoadFunction: BatchLoadFn<K, V>;

  groupByKeyArray<E extends Record<string, any>, Ky extends keyof E>(
    items: E[],
    keyGetter: (item: E) => E[Ky],
    keys: E[Ky][]
  ): E[][] {
    const groupedResults = new Map<E[Ky], E[]>();
    for (const item of items) {
      const key = keyGetter(item);
      const existing = groupedResults.get(key) || [];
      existing.push(item);
      groupedResults.set(key, existing);
    }

    return keys.map((key) => groupedResults.get(key) || []);
  }

  groupByKeySingle<E extends Record<string, any>, Ky extends keyof E>(
    items: E[],
    keyGetter: (item: E) => E[Ky],
    keys: E[Ky][]
  ): E[] {
    const groupedResults = new Map<E[Ky], E>();
    for (const item of items) {
      const key = keyGetter(item);
      groupedResults.set(key, item);
    }

    return keys.map((key) => groupedResults.get(key) || ({} as E));
  }

  public load(key: K): Promise<V> {
    return this.loader.load(key);
  }

  public loadMany(keys: K[]): Promise<Array<V | Error>> {
    return this.loader.loadMany(keys);
  }
}

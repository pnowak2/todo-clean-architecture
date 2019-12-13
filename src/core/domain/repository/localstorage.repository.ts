export abstract class LocalStorageRepository {
  abstract getItem(key: string): any;
  abstract setItem(key: string, value: any): void;
}
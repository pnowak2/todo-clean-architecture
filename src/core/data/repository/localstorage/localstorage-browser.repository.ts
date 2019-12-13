import { ICache } from "../../../../base/cache";
import { LocalStorageRepository } from "../../../domain/repository/localstorage.repository";

export class LocalStorageBrowserRepository implements LocalStorageRepository {
  private cache: ICache;

  constructor(
    private localStorage: Storage,
    private keyPrefix: string = 'app') {

    this.cache = {};
    this.keyPrefix = 'app'

    window.addEventListener('storage', this.handleStorageEvent.bind(this));
  }

  public getItem(key: string): any {
    const normalizedKey = this.normalizeKey(key);

    if (normalizedKey in this.cache) {
      return this.cache[normalizedKey];
    }

    const value = JSON.parse(this.localStorage.getItem(normalizedKey));
    this.cache[normalizedKey] = value;

    return value;
  }

  public setItem(key: string, value: any): void {
    const normalizedKey = this.normalizeKey(key);
    this.cache[normalizedKey] = value;
    const stringifiedValue = JSON.stringify(value);

    this.localStorage.setItem(normalizedKey, stringifiedValue);
  }

  private handleStorageEvent(event: StorageEvent) {
    if (!event.key.startsWith(this.keyPrefix)) {
      return;
    }

    if (event.newValue === null) {
      delete (this.cache[event.key]);
    } else {
      this.cache[event.key] = JSON.parse(event.newValue);
    }
  }

  private normalizeKey(key: string): string {
    return `${this.keyPrefix}-${key}`;
  }
}
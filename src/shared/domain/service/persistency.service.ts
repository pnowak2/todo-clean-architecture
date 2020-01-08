import { DomainService } from '../domain.service';

export abstract class PersistencyService implements DomainService {
  abstract getItem(key: string): any;
  abstract setItem(key: string, value: any): void;
}

import { Observable } from 'rxjs';

export interface UseCase<T, K> {
  execute(input: T): Observable<K>;
}

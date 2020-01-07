import { ValueObject } from '../../../../core/domain/common/value-object';

export interface NameProps {
  value: string
}

export class Name extends ValueObject<NameProps> {

  get value (): string {
    return this.props.value;
  }
  
  private constructor (props: NameProps) {
    super(props);
  }

  public static create (name: string) : Name {
    if (name === undefined || name === null || name.length <= 2 || name.length > 100) {
      throw new Error('User must be greater than 2 chars and less than 100.')
    } else {
      return new Name({ value: name })
    }
  }
}
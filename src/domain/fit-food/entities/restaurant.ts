import { randomUUID } from 'node:crypto';

export interface RestaurantProps {
  ownerId: string;
  name: string;
  cnpj: string;
  phone: string;
  isActive: boolean;
  isOpen: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export type RestaurantUpdateProps = Partial<
  Omit<RestaurantProps, 'ownerId' | 'createdAt' | 'updatedAt'>
>;

export class Restaurant {
  private readonly _id: string;
  private props: RestaurantProps;

  constructor(props: RestaurantProps, id?: string) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  get id(): string {
    return this._id;
  }

  get ownerId(): string {
    return this.props.ownerId;
  }

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    if (!value) throw new Error('Restaurant name must not be empty');

    this.props.name = value;
    this.touch();
  }

  get cnpj(): string {
    return this.props.cnpj;
  }

  set cnpj(value: string) {
    if (!value) throw new Error('Restaurant cnpj must not be empty');

    this.props.cnpj = value;
    this.touch();
  }

  get phone(): string {
    return this.props.phone;
  }

  set phone(value: string) {
    if (!value) throw new Error('Restaurant phone must not be empty');

    this.props.phone = value;
    this.touch();
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  set isActive(value: boolean) {
    this.props.isActive = value;
  }

  get isOpen(): boolean {
    return this.props.isOpen;
  }

  set isOpen(value: boolean) {
    this.props.isOpen = value;
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  private validateProps(name: string, cnpj: string, phone: string): void {
    if (!name) throw new Error('Restaurant name must not be empty');
    if (!cnpj) throw new Error('Restaurant cnpj must not be empty');
    if (!phone) throw new Error('Restaurant phone must not be empty');
  }

  public update(props: RestaurantUpdateProps): void {
    const name = props.name ?? this.props.name;
    const cnpj = props.cnpj ?? this.props.cnpj;
    const phone = props.phone ?? this.props.phone;

    this.validateProps(name, cnpj, phone);

    this.props = {
      ...this.props,
      ...props,
    };

    this.touch();
  }
}

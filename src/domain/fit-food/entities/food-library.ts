import { randomUUID } from 'node:crypto';

import type { IngredientStatus } from '#/domain/constants/contamination-status.js';

export interface FoodLibraryProps {
  name: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  sugarStatus: IngredientStatus;
  glutenStatus: IngredientStatus;
  lactoseStatus: IngredientStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type UpdateFoodLibraryProps = Partial<
  Omit<FoodLibraryProps, 'createdAt' | 'updatedAt'>
>;

export class FoodLibrary {
  private readonly _id: string;
  private props: FoodLibraryProps;

  constructor(props: FoodLibraryProps, id?: string) {
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

  get name(): string {
    return this.props.name;
  }

  set name(value: string) {
    this.props.name = value;
    this.touch();
  }

  get kcal(): number {
    return this.props.kcal;
  }

  set kcal(value: number) {
    if (value < 0) throw new Error('Calories cannot be negative');

    this.props.kcal = value;
    this.touch();
  }

  get protein(): number {
    return this.props.protein;
  }

  set protein(value: number) {
    if (value < 0) throw new Error('Proteins cannot be negative');

    this.props.protein = value;
    this.touch();
  }

  get carbs(): number {
    return this.props.carbs;
  }

  set carbs(value: number) {
    if (value < 0) throw new Error('Carbohydrates cannot be negative');

    this.props.carbs = value;
    this.touch();
  }

  get fat(): number {
    return this.props.fat;
  }

  set fat(value: number) {
    if (value < 0) throw new Error('Fats cannot be negative');

    this.props.fat = value;
    this.touch();
  }

  get sugarStatus(): IngredientStatus {
    return this.props.sugarStatus;
  }

  set sugarStatus(value: IngredientStatus) {
    this.props.sugarStatus = value;
    this.touch();
  }

  get glutenStatus(): IngredientStatus {
    return this.props.glutenStatus;
  }

  set glutenStatus(value: IngredientStatus) {
    this.props.glutenStatus = value;
    this.touch();
  }

  get lactoseStatus(): IngredientStatus {
    return this.props.lactoseStatus;
  }

  set lactoseStatus(value: IngredientStatus) {
    this.props.lactoseStatus = value;
    this.touch();
  }

  get createdAt(): Date {
    return this.props.createdAt ?? new Date();
  }

  get updatedAt(): Date {
    return this.props.updatedAt ?? new Date();
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }

  private validateMacros(
    kcal: number,
    protein: number,
    carbs: number,
    fat: number
  ): void {
    if (kcal < 0) throw new Error('Calories cannot be negative');
    if (protein < 0) throw new Error('Proteins cannot be negative');
    if (carbs < 0) throw new Error('Carbohydrates cannot be negative');
    if (fat < 0) throw new Error('Fats cannot be negative');
  }

  update(props: UpdateFoodLibraryProps): void {
    const targetKcal = props.kcal ?? this.props.kcal;
    const targetProtein = props.protein ?? this.props.protein;
    const targetCarbs = props.carbs ?? this.props.carbs;
    const targetFat = props.fat ?? this.props.fat;

    this.validateMacros(targetKcal, targetProtein, targetCarbs, targetFat);

    this.props = {
      ...this.props,
      ...props,
    };

    this.touch();
  }
}

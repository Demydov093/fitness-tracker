export class Exercise {
  constructor (
    public calories: number,
    public duration: number,
    public name: string,
    public date?: Date,
    public state?: 'completed' | 'cancelled' | null,
    public id?: string
  ) {}
}

export interface Exercises {
  exercises: Exercise;
}

export class TodoMockModel {
    id: string;
    title: string; // <-- different as in todo domain entity
    completed: boolean;

    constructor(params: TodoMockModel) {
        Object.assign(this, params);
    }
}
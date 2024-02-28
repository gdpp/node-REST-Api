import { Request, Response } from 'express';

const todos = [
    { id: 1, text: 'Buy Milk', createdAt: new Date() },
    { id: 2, text: 'Do Homework', createdAt: new Date() },
    { id: 3, text: 'Take a shower', createdAt: new Date() },
    { id: 4, text: 'Buy Bread', createdAt: new Date() },
    { id: 5, text: 'Do the laundry', createdAt: new Date() },
    { id: 6, text: 'Take a nap', createdAt: new Date() },
];

export class TodosController {
    //* Dependency Injection
    constructor() {}

    public getTodos = (req: Request, res: Response) => {
        return res.json(todos);
    };

    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id))
            return res
                .status(400)
                .json({ error: 'Id argument is not a number' });

        const todo = todos.find((todo) => todo.id === id);

        todo
            ? res.json(todo)
            : res.status(404).json({ error: `TODO with id: ${id} not found!` });
    };

    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body;

        if (!text)
            return res.status(400).json({ error: 'Text property is required' });

        const newTodo = {
            id: todos.length + 1,
            text,
            createdAt: new Date(),
        };

        todos.push(newTodo);

        res.json(newTodo);
    };

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id))
            return res
                .status(400)
                .json({ error: 'Id argument is not a number' });

        const todo = todos.find((todo) => todo.id === id);

        if (!todo)
            return res
                .status(404)
                .json({ error: `Todo with id: ${id} not found` });

        const { text, createdAt } = req.body;

        if (!text)
            return res.status(400).json({ error: 'Text property is required' });

        todo.text = text || todo.text;
        todo.createdAt = createdAt || todo.createdAt;

        //! OJO REFERENCIA

        res.json(todo);
    };

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        if (isNaN(id))
            return res
                .status(400)
                .json({ error: 'Id argument is not a number' });

        const todo = todos.find((todo) => todo.id === id);

        if (!todo)
            return res
                .status(404)
                .json({ error: `Todo with id: ${id} not found` });

        res.json(todo);
    };
}

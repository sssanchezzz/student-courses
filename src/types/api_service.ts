export interface IAPIService<T, K = string> {
    getById(id: K): Promise<any>;
    getAll(): Promise<T>;
    create(data: T): void;
    update(id: K, updateValue: T): void;
    delete(id: K): Promise<T>;
}

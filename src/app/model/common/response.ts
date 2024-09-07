export class Response<T> {
    status_code:number|undefined;
    Message:string|undefined;
    Status:string|undefined;
    data:T | undefined;
}
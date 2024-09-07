export class ResponseGrid<T>{
    status_code:number|undefined;
    TotaRecords:number|undefined
    Message:string|undefined;
    Status:string|undefined;
    data:T | undefined;
}
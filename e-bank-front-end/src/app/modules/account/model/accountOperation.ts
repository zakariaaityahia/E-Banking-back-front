export class AccountOperation {
  private _id: number;
  private _operationDate: Date;
  private _amount: number;
  private _type: string;
  private _description: string;



  public get id(): number {
    return this._id;
  }
  public set id(value: number) {
    this._id = value;
  }

  public get operationDate(): Date {
    return this._operationDate;
  }
  public set operationDate(value: Date) {
    this._operationDate = value;
  }

  public get amount(): number {
    return this._amount;
  }
  public set amount(value: number) {
    this._amount = value;
  }

  public get type(): string {
    return this._type;
  }
  public set type(value: string) {
    this._type = value;
  }

  public get description(): string {
    return this._description;
  }
  public set description(value: string) {
    this._description = value;
  }



  public get toJson(): any {
    return {
      id: this.id ?? null,
      operationDate: this.operationDate,
      type: this.type,
      amount: this.amount,
      description: this.description,
    }
  }
}

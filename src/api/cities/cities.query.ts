export class MyRequestsQuery {
  constructor(
    public readonly userId: number,
    public readonly page: number,
  ) {}
}

export class GetPostCodeCommand {
  constructor(
    public readonly postCode: number,
    public readonly userId: number,
  ) {}
}

export class Game {
  private readonly title: string;
  private readonly price: number;
  private readonly imagePath: string;

  constructor(title: string, price: number, imagePath: string) {
    this.title = title;
    this.price = price;
    this.imagePath = imagePath;
  }

  public get getTitle(): string {
    return this.title;
  }

  public get getPrice(): number {
    return this.price;
  }

  public get getImagePath(): string {
    return this.imagePath;
  }
}

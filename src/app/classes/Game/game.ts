export class Game {
  private readonly name: string;
  private readonly price: number;
  private readonly imageUri: string;
  private readonly description: string;
  private readonly requirements: string;
  private readonly developers: string[];
  private readonly publishers: string[];
  private readonly availableOnWindows: boolean;
  private readonly availableOnMac: boolean;
  private readonly availableOnLinux: boolean;


  constructor(name: string, price: number, imageUri: string, description: string, requirements: string, developers: string[], publishers: string[], availableOnWindows: boolean, availableOnMac: boolean, availableOnLinux: boolean) {
    this.name = name;
    this.price = price;
    this.imageUri = imageUri;
    this.description = description;
    this.requirements = requirements;
    this.developers = developers;
    this.publishers = publishers;
    this.availableOnWindows = availableOnWindows;
    this.availableOnMac = availableOnMac;
    this.availableOnLinux = availableOnLinux;

  }

  public get getName(): string {
    return this.name;
  }

  public get getPrice(): number {
    return this.price;
  }

  public get getImageUri(): string {
    return this.imageUri;
  }

  public getDescription(): string {
    return this.description;
  }

  public getRequirements(): string {
    return this.requirements;
  }

  public getDevelopers(): string[] {
    return this.developers;
  }

  public getPublishers(): string[] {
    return this.publishers;
  }

  public getAvailableOnWindows(): boolean {
    return this.availableOnWindows;
  }

  public getAvailableOnMac(): boolean {
    return this.availableOnMac;
  }

  public getAvailableOnLinux(): boolean {
    return this.availableOnLinux;
  }
}

interface ISite {
  id: string;
  name: string;
}

export class Site implements ISite {
  id: string;
  name: string;

  constructor(data: any = {}) {
    this.id = data.id || 0;
    this.name = data.name || null;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
    };
  }
}

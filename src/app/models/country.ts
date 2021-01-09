export interface Country {
  name: string;
  states: string[];
  callCode?: string;
}

export class Country {
  name: string;
  states: string[];
  callCode?: string;

  /**
   *
   */
  constructor() {
  }
}

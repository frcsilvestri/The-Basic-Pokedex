export interface PokemonModel {
    name: string;
    url: string;
    id: number;
    types: {type: {name: string}}[];
    typesList?: string[];
    forms: {url:string}[];
    height: number; 
    weight: number;
  }
  
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonModel } from '../model/pokemon.model';



@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  baseUrl = 'https://pokeapi.co/api/v2/';

  constructor(private http:HttpClient) { }

  getPokemonList(elementsNumber: number, page: number): Observable<HttpResponse<{count: number, results: PokemonModel[]}>>{
    return this.http.get<{count: number, results: PokemonModel[]}>(this.baseUrl + 'pokemon/?limit=' + elementsNumber + '&offset=' + page, {observe: 'response'})
  }

  getSpecificPokemon(filter: string): Observable<HttpResponse<PokemonModel>>{
    return this.http.get<PokemonModel>(this.baseUrl + 'pokemon/' + filter, {observe: 'response'})
  }

  getPokemonDetail(urlToCall: string): Observable<HttpResponse<PokemonModel>>{
    return this.http.get<PokemonModel>(urlToCall, {observe: 'response'})
  }

  getPokemonForm(urlToCall: string): Observable<HttpResponse<{sprites: {front_default:string}}>>{
    return this.http.get<{sprites: {front_default:string}}>(urlToCall, {observe: 'response'})
  }

  getPokemonSpecies(id:number): Observable<HttpResponse<{flavor_text_entries: {flavor_text: string, language: {name:string}}[]}>>{
    return this.http.get<{flavor_text_entries: {flavor_text: string, language: {name:string}}[]}>(this.baseUrl + 'pokemon-species/' + id, {observe: 'response'})
  }
}

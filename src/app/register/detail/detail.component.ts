import { CommonModule } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { getColorByType } from "src/app/model/color-type";
import { PokemonModel } from "src/app/model/pokemon.model";
import { FirstLetterUpperCasePipe } from "src/app/pipe/first-letter-uppercase.pipe";
import { PokeapiService } from "src/app/services/pokeapi.service";


@Component({
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButtonModule, FirstLetterUpperCasePipe],
    selector: 'pokedex-detail',
    templateUrl: './detail.component.html'
})
export class DetailComponent implements OnInit {

    pokemon: PokemonModel = { id: 0, url: '', name: '', forms: [], types: [], height: 0, weight: 0 };
    pokemonImg = '';
    pokemonDescr = '';

    constructor(
        public dialogRef: MatDialogRef<DetailComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { pokemon: PokemonModel },
        private pokeapiService: PokeapiService
    ) {
    }

    ngOnInit(): void {
        this.pokemon.id = this.data.pokemon.id;
        this.pokemon.name = this.data.pokemon.name;
        this.pokemon.forms = this.data.pokemon.forms
        this.pokemon.height = this.data.pokemon.height / 10;
        this.pokemon.weight = this.data.pokemon.weight / 10;
        this.pokemon.typesList = this.data.pokemon.typesList;
        this.pokeapiService.getPokemonForm(this.pokemon.forms[0].url).subscribe({
            next: (result) => {
                if (result.body?.sprites.front_default) {
                    this.pokemonImg = result.body?.sprites.front_default
                }
            }
        })

        this.pokeapiService.getPokemonSpecies(this.pokemon.id).subscribe({
            next: (result) => {
                if (result.body?.flavor_text_entries) {
                    for (let i = 0; i < result.body?.flavor_text_entries.length; i++) {
                        if (result.body?.flavor_text_entries[i].language.name === 'en') {
                            this.pokemonDescr = result.body?.flavor_text_entries[i].flavor_text.replace('', '')
                            i = result.body?.flavor_text_entries.length;
                        }
                    }
                }
            }
        })

    }

    getColorByType(type: string) {
        return getColorByType(type);
    }

    closeDialog(): void {
        this.dialogRef.close();
    }

}
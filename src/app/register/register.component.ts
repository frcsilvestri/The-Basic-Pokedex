import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { PokeapiService } from '../services/pokeapi.service';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { FirstLetterUpperCasePipe } from '../pipe/first-letter-uppercase.pipe';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DetailComponent } from './detail/detail.component';
import { PokemonModel } from '../model/pokemon.model';
import { getColorByType } from '../model/color-type';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
    standalone: true,
    imports: [CommonModule, RouterModule, MatIconModule, MatPaginatorModule, MatTableModule, MatInputModule,
        MatTooltipModule, MatButtonModule, FirstLetterUpperCasePipe, MatDialogModule, DetailComponent, FormsModule],
    selector: 'pokedex-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

    pokemon: PokemonModel[] = [];
    displayedColumns = ["id", "name", "type", "action"];
    pagination = { totalItems: 0, itemsPerPage: 10, page: 0 }
    filter = '';

    constructor(private pokeapiService: PokeapiService, public dialog: MatDialog, private snackBarService: MatSnackBar) { }

    ngOnInit(): void {
        this.searchPokemon(false)
    }

    searchPokemon(buttonClicked: boolean) {
        if (buttonClicked) {
            this.pagination.totalItems = 0;
            this.pagination.itemsPerPage = 10;
            this.pagination.page = 0;
        }
        if (this.filter) {
            this.searchPokemonByFilter();
        }
        else {
            this.searchAllPokemonPaginated()
        }

    }

    searchPokemonByFilter() {
        this.pokeapiService.getSpecificPokemon(this.filter).subscribe({
            next: (result) => {
                if (result.body) {
                    this.pokemon = [
                        {
                            name: result.body.name,
                            id: result.body.id,
                            url: '',
                            height: result.body.height,
                            weight: result.body.weight,
                            forms: result.body.forms,
                            types: result.body.types
                        }
                    ]
                    this.pokemon[0].types.forEach(t => {
                        if (this.pokemon[0].typesList) {
                            this.pokemon[0].typesList.push(t.type.name)
                        }
                        else {
                            this.pokemon[0].typesList = [t.type.name]
                        }
                    })
                    this.pagination.totalItems = 1;
                }
            },
            error: (error) => {
                this.manageApiError(error)
            }
        })
    }

    searchAllPokemonPaginated() {
        this.pokeapiService.getPokemonList(this.pagination.itemsPerPage, this.pagination.page * this.pagination.itemsPerPage).subscribe({
            next: (result) => {
                if (result.body?.count && result.body?.results) {
                    this.pagination.totalItems = result.body.count;
                    this.pokemon = result.body.results;
                    this.pokemon.forEach(p => {
                        this.pokeapiService.getPokemonDetail(p.url).subscribe({
                            next: (res) => {
                                if (res.body?.id) {
                                    p.id = res.body.id
                                    res.body.types.forEach(t => {
                                        if (p.typesList) {
                                            p.typesList.push(t.type.name)
                                        }
                                        else {
                                            p.typesList = [t.type.name]
                                        }

                                    })
                                    p.weight = res.body.weight;
                                    p.height = res.body.height;
                                    p.forms = res.body.forms;
                                }
                            }
                        })
                    })
                }
            },
            error: (error) => {
                this.manageApiError(error)
            }
        })
    }

    manageApiError(error: { status: number }) {
        if (error.status === 404) {
            this.snackBarService.open('Nessun pokemon trovato', 'X')
        }
        else {
            this.snackBarService.open('Errore generico nel sistema', 'X')
        }
        setTimeout(() => {
            this.snackBarService.dismiss()
        }, 3000);
    }


    getColorByType(type: string) {
        return getColorByType(type);
    }


    openInfoDialog(pokemon: PokemonModel) {
        this.dialog.open(DetailComponent, {
            data: {
                pokemon: pokemon
            },
            height: '400px',
            width: '600px',
        });
    }

    onPageChanged(e: PageEvent) {
        this.pagination.itemsPerPage = e.pageSize;
        this.pagination.page = e.pageIndex;
        this.searchPokemon(false);
    }
}
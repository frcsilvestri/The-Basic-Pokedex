import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  standalone: true,
  imports: [RouterModule, HttpClientModule, MatToolbarModule],
  selector: 'pokedex-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'The Basic Pokedex';
}

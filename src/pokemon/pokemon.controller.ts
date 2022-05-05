import { Controller, Get, Param, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(
    private readonly pokemonService: PokemonService,
  ) { }

  @Get('import')
  importPokemons(@Query('force') forceImport: boolean) {
    return this.pokemonService.importPokemons(forceImport);
  }

  @Get()
  findAll(
    @Query() query,
    @Query('fields') fields: string,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number = 10,
  ) {

    const pagination = {
      skip: 0,
      limit: pageSize
    }

    let filter = this._formatFilter(query);

    if (query.fields) {
      fields = fields.split(',').join(' ');
    }

    if (page > 1) {
      pagination['skip'] = page * pageSize
    }

    return this.pokemonService.findAll(filter, fields, pagination);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pokemonService.findOne(+id);
  }

  @Get(':id/add-fav')
  addFavorite(@Param('id') id: string) {
    return this.pokemonService.addFavorite(+id);
  }

  @Get(':id/remove-fav')
  removeFavorite(@Param('id') id: string) {
    return this.pokemonService.removeFavorite(+id);
  }

  _formatFilter(query): Object {
    const filter = {
      // we set this to null since it is not guaranteed that it is set
      // if isFavorite is set in params, it will be overwritten, so we are good!
      isFavorite: null,
    };

    const arrayFields: string[] = ['resistant', 'weaknesses', 'types'];
    for (const key in query) {
      // process the query string

      // we want to process the array fields differenly so that we can format the 
      // filter object correctly
      if (arrayFields.includes(key)) {
        filter[key] = {
          $all: query[key].split(',').map(q => q.trim())
        }
        continue;
      }

      if (key == 'isFavorite') {
        filter[key] = query[key] === 'true';
        continue;
      }

      if (key === 'fastAttack') {
        filter['attacks.fast'] = { $elemMatch: { 'name': query[key] } };
        continue;
      }

      if (key === 'specialAttack') {
        filter['attacks.special'] = { $elemMatch: { 'name': query[key] } };
        continue;
      }

      if (key === 'hp') {
        filter['maxHP'] = { $gte: parseInt(query[key]) };
        continue;
      }

      filter[key] = query[key];

    }
    return filter;
  }

}

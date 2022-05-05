import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { existsSync } from 'fs';
import { writeFile } from 'fs/promises';
import { Model } from 'mongoose';
import { dirname } from 'path';
import { Pokemon, PokemonDocument } from './pokemon.schema';

@Injectable()
export class PokemonService {
  constructor(@InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>) { }

  async findAll(filter: Object, fields: string, pagination: Object): Promise<Pokemon[]> {
    return this.pokemonModel.find(filter, fields, pagination).exec();
  }

  async findOne(id: number): Promise<Pokemon> {
    return this.pokemonModel.findOne({ id }).exec();
  }

  async addFavorite(id: number) {
    return this.pokemonModel.updateOne({id}, {isFavorite: true}).exec();
  }

  async removeFavorite(id: number) {
    return this.pokemonModel.updateOne({id}, {isFavorite: false}).exec();
  }

  async importPokemons(forceImport: boolean = false): Promise<string> {
    const appDir = dirname(require.main.filename);
    const pokemonsFilePath = `${appDir}/../pokemons.json`;
    const importedFlagFilePath = `${appDir}/.imported`;

    if (!forceImport) {
      // check if we have already imported pokemons
      if (existsSync(importedFlagFilePath)) {
        return 'You can import Pokemons only once! use ?force=true to import them anyways!';
      }
    }

    if (!existsSync(pokemonsFilePath)) {
      return 'Please make sure the pokemons.json file is in the app root folder!';
    }

    /*
    we could have used the following if we wanted an async operation!
    
    const pokemonData = await readFile(pokemonsFilePath, {
        encoding: 'utf8'
    });
    
    */
    // start imoprt process
    const pokemonData: Pokemon[] = require(pokemonsFilePath);
    const inserted = await this.pokemonModel.insertMany(pokemonData);
    const importDate = new Date();
    const importDataMessage = `${inserted.length} pokemons imported on ${importDate}`;

    if (inserted.length > 0) {
      try {
        await writeFile(importedFlagFilePath, importDataMessage);
      } catch (err) {
        console.log(err);
      }
    }

    return `${inserted.length} pokemons imported successfully!`;
  }
}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './pokemon.schema';
import { PokemonService } from './pokemon.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pokemon.name, schema: PokemonSchema }])],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule { }

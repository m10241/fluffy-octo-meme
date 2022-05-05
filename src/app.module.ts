import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [
    ConfigModule.forRoot(/* TODO: use joi for config validation */),
    MongooseModule.forRootAsync({
      imports: [ConfigModule, PokemonModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), // has to be set in .env file
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }

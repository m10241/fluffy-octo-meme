import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

describe('PokemonController', () => {
  let controller: PokemonController;

  const pokemonForFindOne = {
    'id': 1,
    'name': 'Bulbasaur',
  }

  const arrayFilterQuery = {
    "weaknesses": "w1, w2",
    "resistant": "res1,res2",
    "types": "t1,t2",
  }

  const isFavoriteQueryTrue = {
    "isFavorite": 'true',
  }

  const isFavoriteQueryFalse = {
    "isFavorite": 'false',
  }

  const mockPokemonService = {
    findOne: jest.fn().mockImplementation(() => {
      return pokemonForFindOne;
    }),
    addFavorite: jest.fn().mockImplementation((id) => {
      return {
        'id': id,
        'isFavorite': true
      }
    }),
    removeFavorite: jest.fn().mockImplementation((id) => {
      return {
        'id': id,
        'isFavorite': false
      }
    }),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [{
        provide: PokemonService,
        useValue: mockPokemonService
      }],
    }).compile();

    controller = module.get<PokemonController>(PokemonController);
  });

  describe('findOne()', () => {
    it('should return a pokemon', async () => {

      expect(await controller.findOne('1')).toBe(pokemonForFindOne);

      expect(mockPokemonService.findOne).toHaveBeenCalled();
    })
  });

  describe('addFavorite()', () => {
    it('should add as favorite', async () => {
      expect(controller.addFavorite('1')).toEqual({
        id: 1,
        isFavorite: true
      });

      expect(mockPokemonService.addFavorite).toHaveBeenCalled();
    })
  });

  describe('removeFavorite()', () => {
    it('should add as favorite', async () => {
      expect(controller.removeFavorite('1')).toEqual({
        id: 1,
        isFavorite: false
      });

      expect(mockPokemonService.removeFavorite).toHaveBeenCalled();
    })
  });

  describe('_formatFilter() --> Array fields', () => {
    it('should format filter when array fileds are present', async () => {
      expect(controller._formatFilter(arrayFilterQuery)).toEqual({
        "isFavorite": null,
        "weaknesses": {
          "$all": [
            "w1",
            "w2",
          ],
        },
        "resistant": {
          "$all": [
            "res1",
            "res2",
          ],
        },
        "types": {
          "$all": [
            "t1",
            "t2",
          ],
        },
      });
    })
  });

  describe('_formatFilter() --> isFavorite(true)', () => {
    it('should parse query and format the filter correctly based on isFavorite', async () => {
      expect(controller._formatFilter(isFavoriteQueryTrue)).toEqual({
        "isFavorite": true,
      });
    })
  });

  describe('_formatFilter() --> isFavorite(false)', () => {
    it('should parse query and format the filter correctly based on isFavorite', async () => {
      expect(controller._formatFilter(isFavoriteQueryFalse)).toEqual({
        "isFavorite": false,
      });
    })
  });

});

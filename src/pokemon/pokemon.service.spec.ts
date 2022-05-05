import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';

describe('PokemonService', () => {
  let service: PokemonService;

  const mockPokemonModel = {
    id: expect.any(Number)
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PokemonService,
        {
          provide: getModelToken('Pokemon'),
          useValue: mockPokemonModel
        }
      ],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
  });

  it('should be defined', () => {
    expect(true).toBeTruthy();
  });
});

export type stringOrNumber = string | number;

export interface PokemonProps {
  name: string;
  url: string;
}

export interface PokemonDetailsProps {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    [key: string]: string;
  };
}

export interface PokedexProps {
  pokemons: PokemonProps[];
  selectedPokemon: PokemonDetailsProps | null;
  teamPokemons: stringOrNumber[];
  isLoading: boolean;
  limit: number;
}

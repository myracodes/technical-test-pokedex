/* eslint-disable @next/next/no-img-element */
import { graphql, useLazyLoadQuery } from 'react-relay';
import { PokemonsQuery } from '../../__generated__/PokemonsQuery.graphql';
import Card from './Card';
import { IPokemon } from '@/interfaces/Pokemon.interface';

const GRAPHQL = graphql`
  query PokemonsQuery {
    pokemons: pokemon_v2_pokemon(limit: 151) {
      pokemonId: id
      name
      pokemon_v2_pokemonspecy {
        is_legendary
      }
      sprites: pokemon_v2_pokemonsprites {
        sprites
      }
      type: pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
    }
  }
`;

// TODO : Add a bit of styling
export const Pokemons = () => {
  const data = useLazyLoadQuery<PokemonsQuery>(GRAPHQL, {});

  return (
    <div className="p-4">
      <h1 className="mb-5 text-[2rem]">Pokedex</h1>
      {/*@TODO: Add searchbar */}
      <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 m-4">
        {data.pokemons.map((item: IPokemon) => {
          return <Card pokemon={item} key={item.pokemonId}></Card>;
        })}
      </div>
    </div>
  );
};

export default Pokemons;

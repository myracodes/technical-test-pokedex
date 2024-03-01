/* eslint-disable @next/next/no-img-element */
import { graphql, useLazyLoadQuery } from 'react-relay';
import { PokemonDetailsQuery } from '../../__generated__/PokemonDetailsQuery.graphql';
import Link from 'next/link';

const GRAPHQL = graphql`
  query PokemonDetailsQuery($pokemonId: Int!) {
    pokemon: pokemon_v2_pokemon_by_pk(id: $pokemonId) {
      name
      sprites: pokemon_v2_pokemonsprites {
        sprites
      }
      specy: pokemon_v2_pokemonspecy {
        is_legendary
      }
    }
  }
`;

export const PokemonDetails = ({ pokemonId }: { pokemonId: number }) => {
  const data = useLazyLoadQuery<PokemonDetailsQuery>(GRAPHQL, { pokemonId });

  return (
    <div>
      Legendary : {data.pokemon?.specy?.is_legendary ? 'Yes' : 'No'}
      <img src={data.pokemon?.sprites[0].sprites.front_default} alt={data.pokemon?.name} />
      <Link href={'/'}>Back</Link>
    </div>
  );
};

export default PokemonDetails;

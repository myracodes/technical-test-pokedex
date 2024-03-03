/* eslint-disable @next/next/no-img-element */
import { graphql, useLazyLoadQuery } from 'react-relay';
import { PokemonDetailsQuery } from '../../__generated__/PokemonDetailsQuery.graphql';
import Link from 'next/link';
import PokemonType from './PokemonTypes';
import EvolutionChain from './EvolutionChain';
import Image from 'next/image';
import Stats from './Stats';

const GRAPHQL = graphql`
  query PokemonDetailsQuery($pokemonId: Int!) {
    pokemon_v2_pokemon_by_pk(id: $pokemonId) {
      name
      pokemon_v2_pokemonspecy {
        is_legendary
        pokemon_v2_pokemoncolor {
          name
        }
        capture_rate
        generation_id
        name
      }
      type: pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
          type_id: id
        }
      }
      weight
      height
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
    }
    pokemon_v2_generation_by_pk(id: $pokemonId) {
      generation_id: id
      generation_name: name
    }
    pokemon_v2_pokemonsprites_by_pk(id: $pokemonId) {
      sprites
    }
    pokemon_v2_evolutionchain(where: { pokemon_v2_pokemonspecies: { id: { _eq: $pokemonId } } }) {
      pokemon_v2_pokemonspecies(where: { generation_id: { _eq: 1 } }, order_by: { id: asc }) {
        pokemon_v2_pokemons {
          name
          evolution_id: id
          pokemon_v2_pokemonsprites {
            sprites
          }
        }
      }
    }
  }
`;

// @TODO: ajouter flèches pour passer au pokemon précédent / suivant
export const PokemonDetails = ({ pokemonId }: { pokemonId: number }) => {
  const data = useLazyLoadQuery<PokemonDetailsQuery>(GRAPHQL, { pokemonId });

  const info = data.pokemon_v2_pokemon_by_pk;
  const sprites = data.pokemon_v2_pokemonsprites_by_pk?.sprites;
  const evolutionChain = data.pokemon_v2_evolutionchain[0].pokemon_v2_pokemonspecies;
  const isLegendary = info?.pokemon_v2_pokemonspecy?.is_legendary;

  return (
    <div key={pokemonId} className="flex flex-col gap-8 items-start justify-center max-w-[600px] mx-auto my-8">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-row items-center justify-center gap-8">
          <Link
            href={'/'}
            className="text-lg uppercase font-bold border-2 px-4 py-1 mt-3 rounded-full border-dark-500 dark:border-neutral-200 hover:bg-neutral-200 dark:hover:bg-dark-300"
          >
            ← Back
          </Link>
          <h1 className="text-[2rem] capitalize grow">
            {info?.name} #{pokemonId.toString().padStart(3, '0')}
          </h1>
        </div>
        <span className="flex flex-row justify-end gap-2 uppercase font-bold text-xl text-end">
          Gen. <p className="font-pokemon"># {info?.pokemon_v2_pokemonspecy?.generation_id}</p>
        </span>
      </div>

      <span className="flex flex-row justify-between gap-4 w-full">
        <span className="flex flex-row items-center gap-4">
          {info?.type.map((type: any) => (
            <span
              key={type.pokemon_v2_type.type_id}
              className={`flex flex-row items-center gap-2 px-2 py-1 rounded-full bg-${type.pokemon_v2_type.name}-500`}
            >
              <PokemonType pokemonType={type.pokemon_v2_type.name}></PokemonType>
              <p className="uppercase font-bold pr-2">{type.pokemon_v2_type.name}</p>
            </span>
          ))}
        </span>

        {isLegendary && (
          <span className="flex flex-row items-center gap-2 border-2 px-4 py-1 rounded-full justify-self-end border-neutral-800">
            <p className="uppercase font-bold">Legendary</p>
            <Image src="/img/golden-pokeball.png" alt="legendary pokemon" width={22} height={22}></Image>
          </span>
        )}
      </span>

      <Stats
        weight={Number(info?.weight) / 10}
        height={Number(info?.height) / 10}
        captureRate={info?.pokemon_v2_pokemonspecy?.capture_rate}
      />

      <span className="flex flex-row mx-auto">
        <img src={sprites?.front_default} alt={info?.name} className="mx-auto" />
        {sprites?.front_shiny && <img src={sprites?.front_shiny} alt={info?.name} className="mx-auto" />}
        {sprites?.back_default && <img src={sprites?.back_default} alt={info?.name} className="mx-auto" />}
        {sprites?.back_shiny && <img src={sprites?.back_shiny} alt={info?.name} className="mx-auto" />}
      </span>
      {evolutionChain && <EvolutionChain evolutionChain={evolutionChain}></EvolutionChain>}

      {/* @TODO: ajouter différents onglets avec les stats, les évolutions, d'autres informations... */}
    </div>
  );
};

export default PokemonDetails;

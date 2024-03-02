/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import PokemonType from './PokemonTypes';

export const Card = ({ pokemon }: any) => {
  const type = pokemon.type[0].pokemon_v2_type.name;

  return (
    <Link href={`/pokemon?id=${pokemon.pokemonId}`}>
      <div
        className={`group flex flex-col justify-between gap-1 group-hover:cursor-pointer bg-${type} rounded-md p-4 h-full`}
      >
        <span className="relative flex flex-row items-center justify-start gap-1 text-lg w-full">
          <p>{pokemon.specy?.is_legendary && '★ '}</p>
          <p className="capitalize font-pokemon">{pokemon.name}</p>
          <p className="absolute -top-3 -right-3 font-pokemon rounded-full w-fit h-fit min-w-8 px-2 py-1 border-2 border-dark-bg dark:border-light-bg bg-light-bg dark:bg-dark-bg text-dark-bg dark:text-light-bg">
            #{pokemon.pokemonId}{' '}
          </p>
        </span>
        <img
          className="saturate-50 scale-75 group-hover:saturate-100 group-hover:scale-100"
          src={pokemon.sprites[0].sprites.front_default}
          alt={pokemon.name}
        />
        <span className="flex flex-row gap-1 self-end">
          {pokemon.type.map((pokemonType: any, index: number) => (
            <PokemonType key={index} pokemonType={pokemonType.pokemon_v2_type.name}></PokemonType>
          ))}
        </span>
      </div>
    </Link>
  );
};
export default Card;

/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import PokemonType from './PokemonTypes';

export const Card = ({ pokemon }: any) => {
  const firstType = pokemon?.type[0].pokemon_v2_type?.name;

  return (
    <Link className="group " href={`/pokemon?id=${pokemon.pokemonId}`}>
      <div
        className={` flex flex-col justify-between gap-1 group-hover:cursor-pointer bg-${firstType} rounded-xl p-4 h-full scale-75 group-hover:scale-100 transition-all`}
      >
        <span className="relative flex flex-row items-center justify-start gap-1 text-lg w-full">
          <p>{pokemon.pokemon_v2_pokemonspecy?.is_legendary && '★ '}</p>
          <p className="capitalize font-pokemon">{pokemon.name}</p>
          <p className="absolute -top-3 -right-3 font-pokemon rounded-full w-fit min-w-[2.5rem] h-[2.5rem] px-2 py-1 bg-light-bg dark:bg-dark-bg text-dark-bg dark:text-light-bg">
            #{pokemon.pokemonId}
          </p>
        </span>
        {pokemon.sprites && (
          <img
            className="saturate-50 scale-75 group-hover:saturate-100 group-hover:scale-125"
            src={pokemon?.sprites[0]?.sprites?.front_default}
            alt={pokemon.name}
          />
        )}
        <span className="flex flex-row gap-1 self-end">
          {pokemon.type.map((type: any, index: number) => (
            <PokemonType key={index} pokemonType={type.name}></PokemonType>
          ))}
        </span>
      </div>
    </Link>
  );
};
export default Card;

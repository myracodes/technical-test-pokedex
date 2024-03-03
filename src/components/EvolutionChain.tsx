/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

// @TODO: typage
export const EvolutionChain = ({ evolutionChain }: { evolutionChain: any }): JSX.Element | null => {
  return !evolutionChain ? null : (
    <div className="flex flex-col gap-8 w-full">
      <h2 className="mx-auto">Evolution chain - First Gen:</h2>
      <span className="flex flex-row items-baseline gap-12 mx-auto">
        {evolutionChain.map((evolution: any) => (
          <Link
            key={evolution.pokemon_v2_pokemons[0].evolution_id}
            href={`/pokemon?id=${evolution.pokemon_v2_pokemons[0].evolution_id}`}
            className="flex flex-col gap-2 w-fit"
          >
            <img
              src={evolution.pokemon_v2_pokemons[0].pokemon_v2_pokemonsprites[0].sprites.front_default}
              alt={evolution?.pokemon_v2_pokemons[0].name}
              className="scale-125"
            />
            <span className="flex flex-row items-center justify-between tracking-wide capitalize ">
              <p className="font-bold">{evolution.pokemon_v2_pokemons[0].name}</p>
              <p className="font-pokemon">#{evolution.pokemon_v2_pokemons[0].evolution_id}</p>
            </span>
          </Link>
        ))}
      </span>
    </div>
  );
};

export default EvolutionChain;

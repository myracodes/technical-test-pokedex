import Image from 'next/image';

import weightIcon from '../assets/icons/weight.svg';
import heightIcon from '../assets/icons/height.svg';
import pokeballIcon from '../assets/icons/pokeball.svg';

interface IStatsProps {
  weight: number;
  height: number;
  captureRate: number | null | undefined;
}

export const Stats = ({ weight, height, captureRate }: IStatsProps) => {
  return (
    <div className="flex flex-row gap-8 mx-auto">
      <span className="flex flex-row gap-2">
        <Image
          className=" rounded-full font-neutral-800 dark:bg-neutral-200"
          src={weightIcon.src}
          alt="weight"
          width={25}
          height={25}
        />
        <p className="">Weight: {weight}kg</p>
      </span>

      <span className="flex flex-row gap-2">
        <Image
          className=" rounded-full font-neutral-800 dark:bg-neutral-200"
          src={heightIcon.src}
          alt="height"
          width={25}
          height={25}
        />
        <p className="">Height: {height}m</p>
      </span>

      <span className="flex flex-row gap-2">
        <Image
          className=" rounded-full font-neutral-800 dark:bg-neutral-200"
          src={pokeballIcon.src}
          alt="pokeball"
          width={25}
          height={25}
        />
        <p className="">Capture rate: {captureRate || 'unknown'}</p>
      </span>
    </div>
  );
};

export default Stats;

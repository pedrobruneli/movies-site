import { IconDefinition } from '@fortawesome/free-regular-svg-icons';

export interface IMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  likes?: number;
  liked?: boolean;
  icon?: IconDefinition;
}

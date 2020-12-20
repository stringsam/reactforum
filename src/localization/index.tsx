import { createContext } from 'react';
import cs from './cs';
import en from './en';

export const texts = { cs, en };

// By declaring `languages` as `keyof T` we can safely use the attribute to index said `T` later
export type Localization = {
  texts: typeof texts;
  language: keyof typeof texts;
};

export const LocalizationContext = createContext<Localization>({
  texts,
  language: 'en',
});

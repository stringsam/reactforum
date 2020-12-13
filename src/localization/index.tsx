import cs from './cs';
import en from './en';
import {createContext} from "react";

export const texts = {
  cs,
  en,
};

interface LocalizationCtxType {
  localization: 'cs' | 'en';
  setLocalization?: React.Dispatch<React.SetStateAction<'cs' | 'en'>>;
}

const defaultContext: LocalizationCtxType = {
  localization: "en"
};
export const LocalizationCtx = createContext<LocalizationCtxType>(
    defaultContext,
);
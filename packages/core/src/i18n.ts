export type TranslationDict = Record<string, string>;

export interface I18nConfig {
  defaultLocale: string;
  supportedLocales: string[];
}

export const defaultI18nConfig: I18nConfig = {
  defaultLocale: 'en',
  supportedLocales: ['en'],
};

export const translate = (
  key: string,
  dict: TranslationDict,
  params: Record<string, string | number> = {}
): string => {
  const template = dict[key];
  if (!template) return key;
  return template.replace(/{{(\w+)}}/g, (_, token) => {
    const value = params[token];
    return value === undefined ? token : String(value);
  });
};

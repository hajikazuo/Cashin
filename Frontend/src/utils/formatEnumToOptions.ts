export const formatEnumToOptions = <T extends Record<string, string | number>>(
    e: T
  ): { label: string; value: T[keyof T] }[] => {
    return Object.keys(e)
      .filter((key) => isNaN(Number(key))) 
      .map((key) => ({
        label: key,
        value: e[key as keyof T],
      }));
  };
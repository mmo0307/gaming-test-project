import type { ReactNode } from 'react';
// eslint-disable-next-line no-duplicate-imports
import { Children } from 'react';

type EachProps<T> = {
  render: (item: T, index: number | string, itemArr: T[]) => ReactNode;

  data: T[];
};

// eslint-disable-next-line
const Each = <T extends unknown>({ render, data }: EachProps<T>) => (
  <>
    {Children.toArray(
      data.map((item, index, itemArr) => render(item, index, itemArr))
    )}
  </>
);

export { Each };

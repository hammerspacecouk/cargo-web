// temporary patch for react hooks types
// update index.d.ts line 566


declare namespace React {
  type StateSetter<T> = {
    (updater: (oldState: T) => T): void
    (newState: T): void
  }

  function useState<T>(initialState: T): [T, StateSetter<T>];

  function useEffect(effect: () => void | (() => void) | Promise<void> | Promise<(() => void)>,
                     dependencies?: any[]): void;

  function useContext<T>(component: any): any;

  function useRef<T>(initialState: T): { current: any };

  function memo(component: (props?: any) => any, compare?: (prev: any, next: any) => any): {};
}

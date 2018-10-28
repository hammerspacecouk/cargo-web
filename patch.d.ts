// temporary patch for react types
// update index.d.ts line 560


type StateSetter<T> = {
(updater: (oldState: T) => T): void
  (newState: T): void
}

function useState<T>(initialState: T): [T, StateSetter<T>];
function useEffect(effect: () => void | (() => void),
                   dependencies?: any[]): void;
function useContext<T>(component: any): any;
function useRef<T>(initialState: T): {current:any};

// temporary patch for react types
// update index.d.ts line 560


// type UseState = {
//   <T>(getInitialState: () => T): [T, StateSetter<T>]
//   <T>(initialState: T): [T, StateSetter<T>]
// }

type StateSetter<T> = {
(updater: (oldState: T) => T): void
  (newState: T): void
}

function useState<T>(initialState: T): [T, StateSetter<T>];
function useEffect(effect: () => void | (() => void),
                   dependencies?: any[]): void;

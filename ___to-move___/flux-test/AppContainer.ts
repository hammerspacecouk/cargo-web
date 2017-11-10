import {ReduceStore, Container} from 'flux/utils';

import AppView from './AppView';
import ScoreStore from './ScoreStore';

const getStores = (): ReduceStore<any, any>[] => {
  return [
    ScoreStore,
  ];
};

const getState = () => {
  return {
    score: 4,
  };
};

export default Container.createFunctional(AppView, getStores, getState);

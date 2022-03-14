import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { loadCategories, loadRegions, loadRestaurants } from './asyncActions';
import { fetchCategories, fetchRegions, fetchRestaurants } from '../services';

import { CATEGORIES, REGIONS, RESTAURANTS } from '../fixture';
import { setCategories, setRegions, setRestaurants } from './actions';

const mockStore = configureStore([thunk]);

jest.mock('../services/index.js');

describe('asyncActions', () => {
  let store;
  beforeEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    fetchRegions.mockResolvedValue(REGIONS);
    fetchCategories.mockResolvedValue(CATEGORIES);
    fetchRestaurants.mockResolvedValue(RESTAURANTS);
  });

  describe('loadRegions', () => {
    it('loadRegions 는 api 통신 후 setRegions 를 dispatch 한다.', async () => {
      store = mockStore({});

      await store.dispatch(loadRegions());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setRegions(REGIONS));
    });
  });

  describe('loadCategories', () => {
    it('loadCategories 는 api 통신 후 setCategories 를 dispatch 한다.', async () => {
      store = mockStore({});

      await store.dispatch(loadCategories());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setCategories(CATEGORIES));
    });
  });

  describe('loadRestaurants', () => {
    describe('store 의 selected 값이 비어있는 경우', () => {
      it('아무 action 도 dispatch 하지 않는다.', async () => {
        store = mockStore({});

        await store.dispatch(loadRestaurants());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });

    describe('store 의 selected 값이 정상적인 경우', () => {
      it('loadRestaurants 는 api 통신 후 setRegions 를 dispatch 한다.', async () => {
        store = mockStore({ selected: { regionName: '서울', categoryId: 1 } });

        await store.dispatch(loadRestaurants());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setRestaurants(RESTAURANTS));
      });
    });
  });
});
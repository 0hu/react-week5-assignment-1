import reducer from './reducer';

import { setCategories } from './actions';

describe('reducer', () => {
  it('정의되어 있지 않은 action이 들어오면 state를 그대로 반환한다.', () => {
    const previousState = {
      categories: [],
      regions: [],
    };
    const state = reducer(previousState, { type: 'sampleAction' });

    expect(state).toStrictEqual(previousState);
  });

  it('state를 넘겨주지 않으면 initalState를 사용한다.', () => {
    const initialState = {
      categories: [],
      regions: [],
    };
    const state = reducer(undefined, { type: 'sampleAction' });

    expect(state).toStrictEqual(initialState);
  });

  describe('setCategories', () => {
    it('categories를 업데이트 한다.', () => {
      const categories = [
        { id: 1, name: '한식' },
      ];

      const state = reducer({
        categories: [],
      }, setCategories(categories));

      expect(state.categories).toHaveLength(1);
    });
  });
});

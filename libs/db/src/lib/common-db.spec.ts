import { commonDb } from './common-db';

describe('commonDb', () => {
  it('should work', () => {
    expect(commonDb()).toEqual('common-db');
  });
});

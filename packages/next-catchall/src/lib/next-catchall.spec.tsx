import NextCatchall from './next-catchall';

describe('NextCatchall', () => {
  it('should render successfully', () => {
    const baseElement  = NextCatchall();
    expect(baseElement).toBeTruthy();
  });
});

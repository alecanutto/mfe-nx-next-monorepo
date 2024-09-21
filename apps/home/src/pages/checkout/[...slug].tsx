import { createFederatedCatchAll } from '@mfe/next-catchall';

export default createFederatedCatchAll({
  remote: 'checkout',
  ErrorComponent: () => <div>Custom Error Component</div>,
  NotFoundComponent: () => <div>Custom Not Found Component</div>,
});

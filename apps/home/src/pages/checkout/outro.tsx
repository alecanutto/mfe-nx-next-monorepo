import { loadRemote } from '@module-federation/enhanced/runtime';
import dynamic from 'next/dynamic';

interface ModuleWithDefaultExport {
  default: React.ComponentType;
}

const Header = dynamic(
  () =>
    loadRemote<ModuleWithDefaultExport>('checkout/Header').then((module) => {
      if (module === null) {
        // Handle the case where the module is null
        throw new Error('Failed to load module');
      }
      return module;
    }),
  {
    ssr: false,
    loading: () => <div>Loading Header...</div>,
  }
);

const Index = dynamic(
  () =>
    loadRemote<ModuleWithDefaultExport>('checkout/pages/index').then((module) => {
      if (module === null) {
        // Handle the case where the module is null
        throw new Error('Failed to load module');
      }
      return module;
    }),
  {
    ssr: false,
    loading: () => <div>Loading Index...</div>,
  }
);

const CheckoutPage = () => {
  return (
    <>
      <Header />
      <Index />
    </>
  );
};

export default CheckoutPage;

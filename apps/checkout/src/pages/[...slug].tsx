import { NextPage } from 'next';
import { Button } from '@mfe/shared/ui';

const SlugPage: NextPage = () => (
    <div>
      <h1 className="text-3xl text-sky-500">
      <span>Página dinamica</span>
      <p> Welcome checkout slug 👋 </p>
      </h1>
      <Button
        className="mt-4"
        size="lg"
        variant="secondary"
      >
        Teste Checkout
      </Button>
    </div>
  );

export default SlugPage;


import { NextPage } from 'next';
import { Button } from '@mfe/shared/ui';

const Teste: NextPage = () => (
    <div>
      <h1 className="text-3xl text-sky-500">
        <span> Hello there, </span>
        Welcome checkout teste 👋
      </h1>
      <Button
        className="mt-4"
        size="lg"
      variant="secondary"
      onClick={() => alert('Teste Checkout')}
      >
        Teste Checkout
      </Button>
    </div>
  );

export default Teste;
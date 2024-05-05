import { Button } from '@mfe/shared/ui';

export function Teste() {
  return (
    <div>
      <h1 className="text-3xl text-sky-500">
        <span> Hello there, </span>
        Welcome checkout teste 👋
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
}

export default Teste;

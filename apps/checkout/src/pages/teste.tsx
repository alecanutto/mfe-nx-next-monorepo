import styles from './index.module.css';
import { Button } from '@mfe-nx-next-monorepo/shared';

export function Teste() {
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome checkout page teste 👋
            </h1>
            <Button
              size="lg"
              variant={'secondary'}
              onClick={() => {
                console.log('executou aqui');
              }}
            >
              Teste Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teste;

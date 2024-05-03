import styles from './index.module.css';

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
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teste;

import styles from "./Styles.module.css";

interface HeaderProps {
  pair: string;
}

export const Header = (props: HeaderProps) => {
  return (
    <section className={styles.header}>
      <h1>{props.pair?.toUpperCase()} Trading View</h1>
    </section>
  );
};

export default Header;

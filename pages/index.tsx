import styles from "styles/Home.module.css";
import { Button } from "@/components/button";

function HomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        Welcome to Next.js!
        <Button />
      </div>
    </div>
  );
}

export default HomePage;

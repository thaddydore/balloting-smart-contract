import styles from './page.module.css';
import Homepage from '@/components/homepage/homepage';

export default function Home() {
	return (
		<main className={styles.main}>
			<h1>Testing our deployed contract</h1>
			<Homepage />
		</main>
	);
}

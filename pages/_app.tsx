import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/Layout';
import UseScrollToTop from '../hooks/useScrollToTop';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<AnimatePresence>
			<div className=" bg-secondary-light dark:bg-primary-dark transition duration-300">
				<Layout>
					<Component {...pageProps} />
				</Layout>
				<UseScrollToTop />
			</div>
		</AnimatePresence>
	);
}

export default MyApp;
import useThemeSwitcher from '../hooks/useThemeSwitcher';

interface CopyrightProps {
  name: string;
}

const Copyright: React.FC<CopyrightProps> = ({ name }) => {
	const [activeTheme] = useThemeSwitcher();

	return (
		<div className="font-general-regular flex justify-center items-center text-center">
			<div className="text-lg text-ternary-dark dark:text-ternary-light">
				&copy; {new Date().getFullYear()} { name }. All rights reserved.
			</div>
		</div>
	);
}

export default Copyright;
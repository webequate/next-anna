import { useTheme } from 'next-themes';

interface CopyrightProps {
  name: string;
}

const Copyright: React.FC<CopyrightProps> = ({ name }) => {
	const { theme, setTheme } = useTheme();

	return (
		<div className="font-general-regular flex justify-center items-center text-center">
			<div className="text-sm text-secondary-dark dark:text-secondary-light mt-4">
				&copy; {new Date().getFullYear()} { name }. All rights reserved.
			</div>
		</div>
	);
}

export default Copyright;
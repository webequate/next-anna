import Image from 'next/image';
import { useTheme } from 'next-themes';

const ThemedImage = () => {
  const { resolvedTheme } = useTheme();
  let src: string;

  switch (resolvedTheme) {
    case 'light':
      src = '/images/allen.png';
      break;
    case 'dark':
      src = '/images/allen.png';
      break;
    default:
      src = '/images/allen.png';
      break;
  }

  return (
    <Image
      src={ src }
      alt="Allen"
      width={400}
      height={400}
      className="w-100 h-100 rounded-xl bg-neutral-200 dark:bg-neutral-800 p-0 m-0"
    />
  );
}

export default ThemedImage;
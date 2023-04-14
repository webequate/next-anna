import { useState, useEffect, useRef } from "react";

interface SkillBarProps {
  name: string;
  level: number;
}

const SkillBar: React.FC<SkillBarProps> = ({ name, level }) => {
  const [isVisible, setIsVisible] = useState(false);
  const skillBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = skillBarRef.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    });

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div ref={skillBarRef} className="w-full mb-4">
      <div className="flex justify-between mb-1">
        <span>{name}</span>
        <span>{level}/5</span>
      </div>
      <div className="bg-gradient-to-t from-neutral-200 to-neutral-300 dark:from-neutral-300 dark:to-neutral-400 h-6 rounded">
        <div
          className={`bg-gradient-to-t from-blue-400 to-blue-600 h-6 rounded transition-all delay-700 duration-1000 ease-in ${
            isVisible ? "" : "w-0"
          }`}
          style={{ width: isVisible ? `${level * 20}%` : undefined }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;

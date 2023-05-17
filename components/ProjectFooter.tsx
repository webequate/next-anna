// components/ProjectFooter.tsx

interface ProjectFooterProps {
  dimensions: string;
  media: string;
  year?: string;
}

const ProjectFooter: React.FC<ProjectFooterProps> = ({
  dimensions,
  media,
  year,
}) => {
  return (
    <div className="text-center">
      <p className="mb-2">
        Dimensions: {dimensions.replace(/(\d+)(?!\d|\.)/g, '$1"')}
      </p>
      <p className="mb-2">Media: {media}</p>
      {year && <p className="mb-2">Year: {year}</p>}
    </div>
  );
};

export default ProjectFooter;

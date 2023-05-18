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
      {dimensions && (
        <p className="mb-0 sm:mb-2">
          <span className="hidden sm:inline">Dimensions: </span>
          {dimensions.replace(/(\d+)(?!\d|\.)/g, '$1"')}
        </p>
      )}
      {media && (
        <p className="mb-0 sm:mb-2">
          <span className="hidden sm:inline">Media: </span>
          {media}
        </p>
      )}
      {year && (
        <p className="mb-0 sm:mb-2">
          <span className="hidden sm:inline">Year: </span>
          {year}
        </p>
      )}
    </div>
  );
};

export default ProjectFooter;

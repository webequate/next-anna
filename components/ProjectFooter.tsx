// components/ProjectFooter.tsx

interface ProjectFooterProps {
  dimensions: string;
  media: string;
}

const ProjectFooter: React.FC<ProjectFooterProps> = ({ dimensions, media }) => {
  return (
    <>
      <p className="text-center mb-2">
        Dimensions: {dimensions.replace(/(\d+)(?!\d|\.)/g, '$1"')}
      </p>
      <p className="text-center mb-2">Media: {media}</p>
    </>
  );
};

export default ProjectFooter;

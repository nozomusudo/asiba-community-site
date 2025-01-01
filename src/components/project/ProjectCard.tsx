import Link from 'next/link';

type ProjectCardProps = {
  project: {
    id: number;
    name: string;
    description: string;
    members: string[];
    cover_image: string;
  };
};

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`}>
      <div className="bg-white rounded-lg shadow overflow-hidden cursor-pointer">
        <div className="aspect-video bg-gray-100">
          {project.cover_image && (
            <img
              src={project.cover_image}
              alt={project.name}
              className="w-full h-full object-cover"
            />
          )}
        </div>
        <div className="p-4">
          <h4 className="font-bold">{project.name}</h4>
          <p className="text-sm text-gray-600 mt-1">{project.description}</p>
          <p className="text-sm text-gray-600 mt-1">
            メンバー: {project.members.join(', ')}
          </p>
        </div>
      </div>
    </Link>
  );
} 
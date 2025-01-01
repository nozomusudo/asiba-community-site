"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching project:', error);
      } else {
        setProject(data);
      }
    };

    if (id) fetchProject();
  }, [id]);

  if (!project) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{project.name}</h1>
      <div className="aspect-video bg-gray-100 mb-4">
        {project.cover_image && (
          <img
            src={project.cover_image}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <p className="text-lg text-gray-700 mb-4">{project.description}</p>
      <p className="text-sm text-gray-600">メンバー: {project.members.join(', ')}</p>
    </div>
  );
} 
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getSkillById } from "../services/skillService";
import { getAllProjects } from "../services/projectService";
import { getImageUrl } from "../utils/imagePath";
import { FaExternalLinkAlt, FaArrowLeft, FaCode } from "react-icons/fa";
import ProjectCard from "../components/ProjectCard";

const SkillDetails = () => {
  const { id } = useParams();
  const [skill, setSkill] = useState(null);
  const [relatedProjects, setRelatedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Skill and All Projects in parallel
        const [skillData, projectsData] = await Promise.all([
          getSkillById(id),
          getAllProjects(),
        ]);

        setSkill(skillData);

        // 2. Filter Projects that use this skill
        if (skillData && projectsData) {
          // 1. Filter matching projects
          const filtered = projectsData.filter((project) =>
            project.technologies.some((tech) => {
              const techName = typeof tech === "string" ? tech : tech.name;
              return techName.toLowerCase() === skillData.name.toLowerCase();
            })
          );

          // 2. Randomize & Limit to 2
          // This simple sort randomly shuffles the array
          const shuffled = filtered.sort(() => 0.5 - Math.random());
          const selected = shuffled.slice(0, 2);

          setRelatedProjects(selected);
        }
      } catch (error) {
        console.error("Error fetching skill details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto pt-10 px-6 animate-pulse">
        <div className="h-32 w-32 bg-gray-200 dark:bg-gray-800 rounded-2xl mb-6 mx-auto"></div>
        <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-4 mx-auto"></div>
        <div className="h-24 w-full bg-gray-200 dark:bg-gray-800 rounded mb-8"></div>
      </div>
    );
  }

  if (!skill) return <div className="text-center pt-20">Skill not found.</div>;

  return (
    <div className="max-w-5xl mx-auto pt-10 pb-20">
      {/* Back Link */}
      <Link
        to="/skills"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent transition-colors mb-8 group"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Back to skills
      </Link>

      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="w-24 h-24 p-5 bg-white dark:bg-gray-800 rounded-3xl border border-gray-300 dark:border-gray-700 mb-6">
          <img
            src={getImageUrl(skill.skillIcon)}
            alt={skill.name}
            className="w-full h-full object-contain"
          />
        </div>

        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {skill.name}
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mb-6">
          {skill.description ||
            `A key technology in my ${skill.category} development stack.`}
        </p>

        {skill.officialWebsite && (
          <a
            href={skill.officialWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium text-sm border border-gray-300 dark:border-transparent transition-all duration-200  dark:hover:border-gray-600 hover:text-accent dark:hover:text-accent mt-4"
          >
            Official Website <FaExternalLinkAlt size={12} />
          </a>
        )}
      </div>

      {/* Related Projects Section */}
      <div className="border-t border-gray-200 dark:border-gray-800 pt-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
          <FaCode className="text-accent" />
          Projects using {skill.name}
        </h2>

        {relatedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {relatedProjects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
            <p className="text-gray-500">
              No projects explicitly listed with this skill yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillDetails;

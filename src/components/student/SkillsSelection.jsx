import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Button from '../shared/Button';

const SkillsSelection = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const [selectedSkills, setSelectedSkills] = useState(() => {
    // Pre-populate if skills already selected
    if (user?.skills && user.skills.length > 0) {
      const skills = {
        programming: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python', 'Java'],
        design: ['UI/UX', 'Figma', 'Adobe XD', 'Photoshop', 'Illustrator'],
        marketing: ['SEO', 'Social Media', 'Content Writing', 'Email Marketing'],
      };
      const selected = [];
      Object.entries(skills).forEach(([category, categorySkills]) => {
        categorySkills.forEach(skill => {
          if (user.skills.includes(skill)) {
            selected.push(`${category}_${skill}`);
          }
        });
      });
      return selected;
    }
    return [];
  });

  const skills = {
    programming: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Python', 'Java'],
    design: ['UI/UX', 'Figma', 'Adobe XD', 'Photoshop', 'Illustrator'],
    marketing: ['SEO', 'Social Media', 'Content Writing', 'Email Marketing'],
  };

  const toggleSkill = (category, skill) => {
    const skillKey = `${category}_${skill}`;
    if (selectedSkills.includes(skillKey)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skillKey));
    } else {
      setSelectedSkills([...selectedSkills, skillKey]);
    }
  };

  const handleContinue = () => {
    const skillsList = selectedSkills.map(s => s.split('_')[1]);
    updateUser({ 
      skills: skillsList,
      skillsSelected: true,
    });
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Select Your Skills
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Choose the skills you're interested in or already have. This will help us create your personalized learning path.
        </p>

        <div className="space-y-8">
          {Object.entries(skills).map(([category, categorySkills]) => (
            <div key={category} className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold mb-4 capitalize text-gray-800">
                {category}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {categorySkills.map((skill) => {
                  const skillKey = `${category}_${skill}`;
                  const isSelected = selectedSkills.includes(skillKey);
                  return (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(category, skill)}
                      className={`p-4 rounded-lg border-2 transition-all transform hover:scale-105 ${
                        isSelected
                          ? 'border-primary bg-primary text-white shadow-lg'
                          : 'border-gray-200 hover:border-primary/50 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          readOnly
                          className="w-5 h-5"
                        />
                        <span className="font-medium">{skill}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <Button
            onClick={handleContinue}
            variant="primary"
            disabled={selectedSkills.length === 0}
            className="px-8 py-4 text-lg"
          >
            Continue ({selectedSkills.length} selected)
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SkillsSelection;



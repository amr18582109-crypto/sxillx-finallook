import { BookOpen, Briefcase, TrendingUp, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <BookOpen className="w-12 h-12 text-primary" />,
      title: 'Personalized Learning',
      description: 'Take our skills assessment and get a customized learning roadmap tailored to your goals.',
    },
    {
      icon: <Briefcase className="w-12 h-12 text-secondary" />,
      title: 'Job Matching',
      description: 'Connect with companies looking for your skills. Apply to jobs that match your profile.',
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-primary" />,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed progress tracking and skill assessments.',
    },
    {
      icon: <Users className="w-12 h-12 text-secondary" />,
      title: 'Community Support',
      description: 'Join a community of learners, share achievements, and get support from peers.',
    },
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose SkillX?</h2>
          <p className="text-xl text-gray-600">Everything you need to launch your career</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`landing-feature animate-fade-in-up`} 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;



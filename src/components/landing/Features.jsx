import { BookOpen, Briefcase, TrendingUp, Users, Target, Zap, Shield, Globe } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Target className="w-8 h-8 text-white" />,
      title: 'Personalized Learning',
      description: 'Take our skills assessment and get a customized learning roadmap tailored to your goals.',
      gradient: 'from-purple-500 to-blue-500',
    },
    {
      icon: <Briefcase className="w-8 h-8 text-white" />,
      title: 'Job Matching',
      description: 'Connect with companies looking for your skills. Apply to jobs that match your profile.',
      gradient: 'from-pink-500 to-purple-500',
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed progress tracking and skill assessments.',
      gradient: 'from-green-500 to-blue-500',
    },
    {
      icon: <Users className="w-8 h-8 text-white" />,
      title: 'Community Support',
      description: 'Join a community of learners, share achievements, and get support from peers.',
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: 'Quick Learning',
      description: 'Fast-track your career with accelerated learning paths and real-world projects.',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: 'Certified Skills',
      description: 'Earn industry-recognized certificates that validate your expertise.',
      gradient: 'from-indigo-500 to-purple-500',
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800 }}
          >
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Why Choose SkillX?
            </span>
          </h2>
          <p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Everything you need to launch your career in one platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              style={{ 
                boxShadow: '0 4px 20px rgba(139, 92, 246, 0.15)',
                borderRadius: '20px'
              }}
            >
              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>

              {/* Content */}
              <h3 
                className="text-xl font-bold text-gray-900 mb-3"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700 }}
              >
                {feature.title}
              </h3>
              <p 
                className="text-gray-600 leading-relaxed"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                {feature.description}
              </p>

              {/* Hover indicator */}
              <div className={`mt-4 h-1 w-12 bg-gradient-to-r ${feature.gradient} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-white rounded-2xl p-12 shadow-xl" style={{ boxShadow: '0 8px 30px rgba(139, 92, 246, 0.25)' }}>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>10K+</div>
              <div className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Active Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>500+</div>
              <div className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Partner Companies</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>1M+</div>
              <div className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Learning Hours</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>95%</div>
              <div className="text-gray-600" style={{ fontFamily: 'Inter, sans-serif' }}>Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;



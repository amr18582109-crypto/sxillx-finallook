import { ArrowRight, Star, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/Button';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-blue-50 py-20 px-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-purple-100 rounded-full px-4 py-2 shadow-sm">
              <Star className="w-4 h-4 text-purple-600 fill-purple-600" />
              <span className="text-sm font-medium text-purple-900">Trusted by 10,000+ students</span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-6xl font-bold leading-tight" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800 }}>
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Connect. Learn.
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Grow.
              </span>
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
              SkillX connects ambitious students with innovative companies while helping you develop skills you need to succeed. Take our personalized assessment, follow your custom learning roadmap, and land your dream job.
            </p>

            {/* Stats */}
            <div className="flex space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600" style={{ fontFamily: 'Poppins, sans-serif' }}>10K+</div>
                <div className="text-sm text-gray-600">Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600" style={{ fontFamily: 'Poppins, sans-serif' }}>500+</div>
                <div className="text-sm text-gray-600">Companies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600" style={{ fontFamily: 'Poppins, sans-serif' }}>95%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>

            {/* CTA Button */}
            <Button
              onClick={() => navigate('/?login=true')}
              variant="primary"
              className="text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                boxShadow: '0 4px 12px rgba(168, 85, 247, 0.4)',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600
              }}
            >
              Get Started
              <ArrowRight className="inline ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* Right side - Feature cards */}
          <div className="relative">
            <div className="relative z-10 space-y-4">
              {/* Main card */}
              <div className="bg-white rounded-2xl p-6 shadow-xl" style={{ boxShadow: '0 4px 20px rgba(139, 92, 246, 0.15)' }}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Community</h3>
                    <p className="text-sm text-gray-600">Join 10,000+ learners</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                  </div>
                  <p className="text-xs text-gray-600">75% of students completed this week</p>
                </div>
              </div>

              {/* Secondary card */}
              <div className="bg-white rounded-2xl p-6 shadow-xl ml-8" style={{ boxShadow: '0 4px 20px rgba(139, 92, 246, 0.15)' }}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900" style={{ fontFamily: 'Poppins, sans-serif' }}>Achievements</h3>
                    <p className="text-sm text-gray-600">Earn certificates</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <Star className="w-4 h-4 text-white fill-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
                    <Star className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 opacity-60 transform rotate-12"></div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-400 opacity-60 transform -rotate-12"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;



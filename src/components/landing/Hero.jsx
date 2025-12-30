import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/Button';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Connect. Learn. Grow.
            </h1>
            <p className="text-xl text-gray-600">
              SkillX connects ambitious students with innovative companies while helping you develop the skills you need to succeed. Take our personalized assessment, follow your custom learning roadmap, and land your dream job.
            </p>
            <Button
              onClick={() => navigate('/?login=true')}
              variant="primary"
              className="text-lg px-8 py-4"
            >
              Get Started
              <ArrowRight className="inline ml-2 w-5 h-5" />
            </Button>
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white rounded-lg p-6 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
                      SX
                    </div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                      <div className="h-3 bg-gray-100 rounded w-24 mt-2"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded"></div>
                    <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-3 bg-gray-100 rounded w-4/6"></div>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded"></div>
                    <div className="flex-1 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;



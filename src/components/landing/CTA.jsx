import { ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../shared/Button';

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div 
          className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
          style={{ borderRadius: '24px' }}
        >
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          </div>

          <div className="relative z-10">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 mb-8">
              <Star className="w-4 h-4 text-white fill-white" />
              <span className="text-sm font-medium text-white">Join 10,000+ successful students</span>
            </div>

            {/* Heading */}
            <h2 
              className="text-4xl md:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800 }}
            >
              Ready to Transform Your Career?
            </h2>

            {/* Description */}
            <p 
              className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              Start your journey today and join thousands of students who have already landed their dream jobs through SkillX.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={() => navigate('/?login=true')}
                className="text-lg px-8 py-4 rounded-xl bg-white text-purple-600 hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                Get Started Free
                <ArrowRight className="inline ml-2 w-5 h-5" />
              </Button>
              
              <Button
                onClick={() => navigate('/jobs')}
                variant="outline"
                className="text-lg px-8 py-4 rounded-xl border-2 border-white text-white hover:bg-white hover:text-purple-600 transition-all duration-300"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600
                }}
              >
                Browse Jobs
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8">
              <div className="text-white/80">
                <div className="text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>4.9/5</div>
                <div className="text-sm">Student Rating</div>
              </div>
              <div className="text-white/80">
                <div className="text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>24/7</div>
                <div className="text-sm">Support</div>
              </div>
              <div className="text-white/80">
                <div className="text-2xl font-bold" style={{ fontFamily: 'Poppins, sans-serif' }}>Free</div>
                <div className="text-sm">To Start</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;

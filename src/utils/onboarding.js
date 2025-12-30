// Helper function to get the next onboarding step for a user
export const getNextOnboardingStep = (user) => {
  if (!user || user.type !== 'student') {
    return null;
  }

  // Check if onboarding is complete
  if (user.onboardingComplete) {
    return null; // Onboarding complete, no redirect needed
  }

  // Check if skills are selected
  if (!user.skillsSelected || !user.skills || user.skills.length === 0) {
    return '/skills-selection';
  }

  // Check if quiz is completed
  if (!user.quizCompleted || !user.quizResults) {
    return '/quiz';
  }

  // If skills and quiz are done but onboarding not marked complete, redirect to quiz results
  // This shouldn't happen, but just in case
  return null;
};

// Check if user can access a route
export const canAccessRoute = (user, route) => {
  if (!user || user.type !== 'student') {
    return true; // Not a student, let other checks handle it
  }

  // If onboarding is complete, allow access to all routes
  if (user.onboardingComplete) {
    return true;
  }

  // Allow access to onboarding routes
  const onboardingRoutes = ['/skills-selection', '/quiz'];
  if (onboardingRoutes.includes(route)) {
    return true;
  }

  // Block access to other routes until onboarding is complete
  return false;
};


// Mock users for leaderboard
export const generateMockStudents = () => {
  const names = [
    'Ahmed Mohamed', 'Sara Ali', 'Mohamed Hassan', 'Fatima Ibrahim',
    'Omar Khaled', 'Nour Ahmed', 'Youssef Mahmoud', 'Mariam Farid',
    'Khaled Mostafa', 'Layla Samir', 'Amr Tarek', 'Dina Waleed',
    'Hassan Reda', 'Rania Magdy', 'Tamer Fawzy', 'Nada Sherif',
    'Karim Ashraf', 'Salma Nabil', 'Bassem Wael', 'Yara Hany',
    'Mahmoud Adel', 'Heba Osama', 'Sherif Tamer', 'Noha Sameh',
    'Waleed Karim', 'Reem Mostafa', 'Adel Hossam', 'Dalia Nader',
    'Fady Samy', 'Rana Ashraf',
  ];

  return names.map((name, index) => ({
    id: `student_${index + 1}`,
    name,
    avatar: ['👨‍💻', '👩‍💻', '👨‍🎨', '👩‍🎨', '👨‍💼', '👩‍💼', '👨‍🎓', '👩‍🎓'][index % 8],
    progress: Math.floor(Math.random() * 40) + 60, // 60-99%
  })).sort((a, b) => b.progress - a.progress);
};



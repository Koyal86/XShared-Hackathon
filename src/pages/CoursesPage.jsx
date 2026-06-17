import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Clock, Users, BookOpen } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const CoursesPage = () => {
  const { toast } = useToast();

  // ✅ Filters state
  const [selectedDomain, setSelectedDomain] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");

  const courses = [
    {
      id: 1,
      title: 'Complete React Developer Course',
      category: 'Programming',
      rating: 4.8,
      students: 12500,
      duration: 40, // in hours
      isPremium: false,
      level: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee'
    },
    {
      id: 2,
      title: 'UI/UX Design Fundamentals',
      category: 'Design',
      rating: 4.9,
      students: 8900,
      duration: 25,
      isPremium: true,
      level: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5'
    },
    {
      id: 3,
      title: 'Data Science with Python',
      category: 'Data Science',
      rating: 4.7,
      students: 15600,
      duration: 60,
      isPremium: false,
      level: 'Advanced',
      thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
    },
    {
      id: 4,
      title: 'Digital Marketing Strategies',
      category: 'Marketing',
      rating: 4.5,
      students: 7800,
      duration: 30,
      isPremium: true,
      level: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f'
    },
    {
      id: 5,
      title: 'Machine Learning with TensorFlow',
      category: 'AI/ML',
      rating: 4.6,
      students: 9200,
      duration: 50,
      isPremium: true,
      level: 'Advanced',
      thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb'
    },
    {
      id: 6,
      title: 'Fullstack Web Development',
      category: 'Web Development',
      rating: 4.8,
      students: 14000,
      duration: 70,
      isPremium: false,
      level: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1581090700227-4c4f50b1d1d5'
    }
  ];

  // ✅ Dropdown filter options
  const domains = ["All", "Programming", "Design", "Data Science", "Marketing", "AI/ML", "Web Development"];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];
  const durationFilters = [
    { label: "All", value: "All" },
    { label: "≤ 20 hours", value: "20" },
    { label: "≤ 40 hours", value: "40" },
    { label: "≤ 60 hours", value: "60" },
    { label: "≤ 80 hours", value: "80" }
  ];

  // ✅ Apply filters
  const filteredCourses = courses.filter((course) => {
    const domainMatch = selectedDomain === "All" || course.category === selectedDomain;
    const levelMatch = selectedLevel === "All" || course.level === selectedLevel;

    let durationMatch = true;
    if (selectedDuration !== "All") {
      durationMatch = course.duration <= parseInt(selectedDuration);
    }

    return domainMatch && levelMatch && durationMatch;
  });

  return (
    <>
      <Helmet>
        <title>Courses - XShared</title>
        <meta name="description" content="Browse our extensive library of courses to learn new skills." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 flex flex-col md:flex-row md:items-center justify-between"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Our Courses
            </h1>
            <p className="text-white/80">
              Expand your knowledge with our expert-led courses.
            </p>
          </div>

          {/* ✅ Filters */}
          <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
            <select
              value={selectedDomain}
              onChange={(e) => setSelectedDomain(e.target.value)}
              className="bg-white/10 border border-white/20 text-white p-2 rounded"
            >
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain}
                </option>
              ))}
            </select>

            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="bg-white/10 border border-white/20 text-white p-2 rounded"
            >
              {levels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>

            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              className="bg-white/10 border border-white/20 text-white p-2 rounded"
            >
              {durationFilters.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* ✅ Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="feature-card h-full">
                <div className="relative">
                  <img
                    className="w-full h-48 object-cover rounded-t-lg"
                    alt={course.title}
                    src={course.thumbnail}
                  />
                  {course.isPremium && (
                    <Badge className="absolute top-3 right-3 bg-yellow-500 text-black">Premium</Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-2 text-white/70 border-white/20">
                    {course.category}
                  </Badge>
                  <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>

                  {/* ✅ Info row */}
                  <div className="flex flex-wrap gap-4 text-sm text-white/60 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star size={14} className="text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users size={14} />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{course.duration} hours</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">{course.level}</span>
                    </div>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() =>
                      toast({
                        title: "🚧 This feature isn't implemented yet—but don't worry! 🚀",
                        description: `You selected "${course.title}".`,
                      })
                    }
                  >
                    <BookOpen size={16} className="mr-2" />
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {filteredCourses.length === 0 && (
            <p className="text-white/60 col-span-full">No courses match your filters.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CoursesPage;

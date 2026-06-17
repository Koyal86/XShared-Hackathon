import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

const sampleExperiences = [
  {
    id: 1,
    author: "Sarah Chen",
    avatar: "",
    time: "2 hours ago",
    content:
      "Just completed my first React course! The journey was challenging but incredibly rewarding.",
    likes: 24,
    comments: [
      { author: "Mike", text: "Congrats Sarah! 🚀", time: "1h ago" },
      { author: "Emily", text: "That’s inspiring!", time: "30m ago" },
    ],
    shares: 3,
  },
  {
    id: 2,
    author: "Michael Johnson",
    avatar: "",
    time: "1 day ago",
    content:
      "Sharing my internship experience at TechCorp. The mentorship program was amazing.",
    likes: 45,
    comments: [],
    shares: 8,
  },
  {
    id: 3,
    author: "Emily Davis",
    avatar: "",
    time: "3 days ago",
    content:
      "Attended a UX design bootcamp and learned so much about creating user-centered designs.",
    likes: 30,
    comments: [],
    shares: 2,
  },
  {
    id: 4,
    author: "Alex Rodriguez",
    avatar: "",
    time: "5 days ago",
    content:
      "Worked on a cloud migration project at Microsoft. Learned about scalability and DevOps best practices.",
    likes: 52,
    comments: [],
    shares: 10,
  },
];

const ExperiencesPage = () => {
  const navigate = useNavigate();
  const [experiences, setExperiences] = useState([]);
  const [expanded, setExpanded] = useState(null); // track which thread is open
  const [newComment, setNewComment] = useState({}); // store draft comments

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("xshared_experiences")) || [];
    setExperiences([...stored, ...sampleExperiences]);
  }, []);

  const handleAddComment = (id) => {
    if (!newComment[id] || !newComment[id].trim()) return;

    const updated = experiences.map((exp) =>
      exp.id === id
        ? {
            ...exp,
            comments: [
              ...(exp.comments || []),
              { author: "You", text: newComment[id], time: "just now" },
            ],
          }
        : exp
    );

    setExperiences(updated);
    localStorage.setItem("xshared_experiences", JSON.stringify(updated));
    setNewComment({ ...newComment, [id]: "" });
  };

  return (
    <>
      <Helmet>
        <title>Experiences - XShared</title>
        <meta
          name="description"
          content="Read and share internship or work experiences from the community."
        />
      </Helmet>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center justify-between"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 md:mb-0">
            Community Experiences
          </h1>
          <Button
            onClick={() => navigate("/share-experience/wizard")}
            className="bg-gradient-to-r from-blue-500 to-purple-600"
          >
            + Share Your Experience
          </Button>
        </motion.div>

        {/* Experiences feed */}
        <div className="space-y-6">
          {experiences.map((exp) => (
            <Card key={exp.id} className="bg-white/5 border-white/10">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="w-10 h-10 mr-3">
                    <AvatarImage src={exp.avatar} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {exp.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-white font-semibold">{exp.author}</h3>
                    <p className="text-white/60 text-sm">{exp.time}</p>
                  </div>
                </div>
                <p className="text-white/90 mb-4">{exp.content}</p>

                {/* Chat Thread Toggle */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setExpanded(expanded === exp.id ? null : exp.id)
                  }
                  className="flex items-center gap-2 text-white/80 border-white/20"
                >
                  <MessageCircle size={16} />
                  {expanded === exp.id ? "Hide Comments" : "View Comments"} (
                  {exp.comments?.length || 0})
                </Button>

                {/* Thread */}
                {expanded === exp.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-4 space-y-4"
                  >
                    {(exp.comments || []).map((c, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-3 p-3 bg-white/5 rounded-lg"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs">
                            {c.author.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white text-sm font-medium">
                            {c.author}{" "}
                            <span className="text-white/50 text-xs ml-2">
                              {c.time}
                            </span>
                          </p>
                          <p className="text-white/80 text-sm">{c.text}</p>
                        </div>
                      </div>
                    ))}

                    {/* Add comment */}
                    <div className="flex items-center space-x-2">
                      <Textarea
                        placeholder="Write a comment..."
                        value={newComment[exp.id] || ""}
                        onChange={(e) =>
                          setNewComment({
                            ...newComment,
                            [exp.id]: e.target.value,
                          })
                        }
                        className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                        rows={1}
                      />
                      <Button
                        size="icon"
                        onClick={() => handleAddComment(exp.id)}
                      >
                        <Send size={16} />
                      </Button>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default ExperiencesPage;

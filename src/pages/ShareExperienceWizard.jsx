import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { useFireworks } from "@/contexts/FireworksContext";
import { useAuth } from "@/contexts/AuthContext";   // ✅ import auth context
import { useToast } from "@/components/ui/use-toast"; // ✅ import toast

const steps = ["Company", "Rounds", "Questions", "Tips", "Upload"];

const ShareExperienceWizard = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    positionType: "Internship",
    interviewDate: "",
    location: "",
    rounds: [],
    questions: {},
    tips: "",
    upload: "",
  });

  const navigate = useNavigate();
  const { fire } = useFireworks();
  const { user, updateUser } = useAuth();  // ✅ get current user
  const { toast } = useToast();            // ✅ for popup

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleRound = (round) => {
    setFormData((prev) => {
      const exists = prev.rounds.includes(round);
      let updatedRounds = exists
        ? prev.rounds.filter((r) => r !== round)
        : [...prev.rounds, round];

      const updatedQuestions = { ...prev.questions };
      updatedRounds.forEach((r) => {
        if (!updatedQuestions[r]) updatedQuestions[r] = [{ q: "", a: "" }];
      });

      return { ...prev, rounds: updatedRounds, questions: updatedQuestions };
    });
  };

  const addQuestion = (round) => {
    setFormData((prev) => {
      const updated = { ...prev.questions };
      updated[round].push({ q: "", a: "" });
      return { ...prev, questions: updated };
    });
  };

  const handleQuestionChange = (round, index, field, value) => {
    setFormData((prev) => {
      const updated = { ...prev.questions };
      updated[round][index][field] = value;
      return { ...prev, questions: updated };
    });
  };

  const handleNext = () => {
    if (step < steps.length) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    const newExperience = {
      id: Date.now(),
      author: user?.name || "You",
      avatar: "",
      time: "just now",
      company: formData.company,
      role: formData.role,
      positionType: formData.positionType,
      interviewDate: formData.interviewDate,
      location: formData.location,
      rounds: formData.rounds,
      questions: formData.questions,
      tips: formData.tips,
      upload: formData.upload,
      likes: 0,
      comments: [],
      shares: 0,
    };

    // Save into localStorage
    const existing =
      JSON.parse(localStorage.getItem("xshared_experiences")) || [];
    localStorage.setItem(
      "xshared_experiences",
      JSON.stringify([newExperience, ...existing])
    );

    // ✅ Award Points & Contributions
    updateUser({
      points: (user?.points || 0) + 100,
      contributions: (user?.contributions || 0) + 1,
    });

    // ✅ Fireworks + Toast
    fire();
    toast({
      title: "🎉 Experience Shared! +100 Points!",
      description: "Thanks for contributing. Your post is now live in Community.",
    });

    // Redirect
    navigate("/share-experience");
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <Card className="feature-card">
        <CardHeader>
          <CardTitle className="text-white">
            Share Experience ({steps[step - 1]})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Step 1 - Company Info */}
          {step === 1 && (
            <div className="space-y-4">
              <Input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company Name"
              />
              <Input
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Role Applied For"
              />
              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant={
                    formData.positionType === "Internship"
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    setFormData({ ...formData, positionType: "Internship" })
                  }
                >
                  Internship
                </Button>
                <Button
                  type="button"
                  variant={
                    formData.positionType === "Full Time"
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    setFormData({ ...formData, positionType: "Full Time" })
                  }
                >
                  Full Time
                </Button>
              </div>
              <Input
                type="date"
                name="interviewDate"
                value={formData.interviewDate}
                onChange={handleChange}
              />
              <Input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
              />
            </div>
          )}

          {/* Step 2 - Rounds */}
          {step === 2 && (
            <div className="space-y-4">
              {["Aptitude Test", "Technical Round", "HR Round"].map((round) => (
                <div key={round} className="flex items-center space-x-2">
                  <Checkbox
                    checked={formData.rounds.includes(round)}
                    onCheckedChange={() => toggleRound(round)}
                  />
                  <span className="text-white">{round}</span>
                </div>
              ))}
            </div>
          )}

          {/* Step 3 - Questions */}
          {step === 3 && (
            <div className="space-y-6">
              {formData.rounds.length === 0 ? (
                <p className="text-white/70">
                  No rounds selected. Please go back and choose at least one
                  round.
                </p>
              ) : (
                formData.rounds.map((round) => (
                  <div key={round} className="space-y-4 border p-4 rounded-lg">
                    <h3 className="text-white font-semibold">{round}</h3>
                    {formData.questions[round]?.map((qa, idx) => (
                      <div key={idx} className="space-y-2">
                        <Input
                          value={qa.q}
                          onChange={(e) =>
                            handleQuestionChange(round, idx, "q", e.target.value)
                          }
                          placeholder="Question"
                        />
                        <Textarea
                          value={qa.a}
                          onChange={(e) =>
                            handleQuestionChange(round, idx, "a", e.target.value)
                          }
                          placeholder="Your Answer"
                        />
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => addQuestion(round)}
                    >
                      + Add Question
                    </Button>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Step 4 - Tips */}
          {step === 4 && (
            <div>
              <Textarea
                name="tips"
                value={formData.tips}
                onChange={handleChange}
                placeholder="Share some tips..."
              />
            </div>
          )}

          {/* Step 5 - Upload + Summary */}
          {step === 5 && (
            <div className="space-y-4">
              <Input
                type="file"
                name="upload"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    upload: e.target.files[0]?.name,
                  })
                }
              />
              {formData.upload && (
                <p className="text-white mt-2">Uploaded: {formData.upload}</p>
              )}

              {/* Summary */}
              <div className="mt-6 p-4 border border-white/20 rounded-lg text-white space-y-2">
                <p>
                  <strong>Company:</strong> {formData.company}
                </p>
                <p>
                  <strong>Role:</strong> {formData.role} (
                  {formData.positionType})
                </p>
                <p>
                  <strong>Date:</strong> {formData.interviewDate}
                </p>
                <p>
                  <strong>Location:</strong> {formData.location}
                </p>
                <p>
                  <strong>Rounds:</strong>{" "}
                  {formData.rounds.length > 0
                    ? formData.rounds.join(", ")
                    : "N/A"}
                </p>
                {formData.rounds.map((r) => (
                  <div key={r}>
                    <strong>{r}:</strong>
                    {formData.questions[r]?.map((qa, idx) => (
                      <p key={idx}>
                        Q: {qa.q} <br /> A: {qa.a}
                      </p>
                    ))}
                  </div>
                ))}
                <p>
                  <strong>Tips:</strong> {formData.tips || "N/A"}
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={handlePrev} disabled={step === 1}>
              Previous
            </Button>
            {step < steps.length ? (
              <Button onClick={handleNext}>Next Step</Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-500 to-purple-600"
              >
                Done
              </Button>
            )}
          </div>

          {/* Step Indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {steps.map((s, i) => (
              <div
                key={s}
                className={`w-3 h-3 rounded-full ${
                  i + 1 <= step ? "bg-blue-500" : "bg-white/30"
                }`}
              ></div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShareExperienceWizard;

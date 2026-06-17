import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const QACreate = ({ setShowCreateQuestion, onAddQuestion }) => {
  const { toast } = useToast();
  const [newQuestion, setNewQuestion] = useState({
    title: '',
    content: '',
    category: 'general',
    tags: ''
  });

  const handleCreateQuestion = (e) => {
    e?.preventDefault?.();
    if (!newQuestion.title.trim() || !newQuestion.content.trim()) {
      toast({ title: 'Missing information', description: 'Please provide title and details.', variant: 'destructive' });
      return;
    }

    // Convert tags to array
    const tagsArray = (newQuestion.tags || '').split(',').map(t => t.trim()).filter(Boolean);

    // call parent handler
    if (typeof onAddQuestion === 'function') {
      onAddQuestion({ title: newQuestion.title.trim(), content: newQuestion.content.trim(), category: newQuestion.category, tags: tagsArray });
    }

    // clear form (parent will close)
    setNewQuestion({ title: '', content: '', category: 'general', tags: '' });
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-8">
      <Card className="feature-card">
        <CardHeader>
          <CardTitle className="text-white">Ask a Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateQuestion} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white/90 mb-2 block">Question Title</label>
              <Input value={newQuestion.title} onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })} placeholder="What's your question?" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
            </div>

            <div>
              <label className="text-sm font-medium text-white/90 mb-2 block">Question Details</label>
              <Textarea value={newQuestion.content} onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })} placeholder="Provide more details..." className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-white/90 mb-2 block">Category</label>
                <select value={newQuestion.category} onChange={(e) => setNewQuestion({ ...newQuestion, category: e.target.value })} className="w-full bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white">
                  <option value="general">General</option>
                  <option value="career">Career</option>
                  <option value="technical">Technical</option>
                  <option value="education">Education</option>
                  <option value="internship">Internships</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-white/90 mb-2 block">Tags (comma separated)</label>
                <Input value={newQuestion.tags} onChange={(e) => setNewQuestion({ ...newQuestion, tags: e.target.value })} placeholder="react, javascript, career" className="bg-white/10 border-white/20 text-white placeholder:text-white/50" />
              </div>
            </div>

            <div className="flex space-x-3">
              <Button type="submit" className="bg-blue-500 hover:bg-blue-600">Post Question</Button>
              <Button variant="outline" onClick={() => setShowCreateQuestion(false)}>Cancel</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default QACreate;

import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { supabase } from '../integrations/supabase/client';
import { toast } from "sonner";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Announcement {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  author: string | null;
  created_at: string;
}

interface UserProfile {
  id: string;
  user_id: string;
  role: string | null;
}

const Announcements = () => {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: '',
    author: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const queryClient = useQueryClient();

  // Check user authentication and profile
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { data: profile } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .single();
        
        setUserProfile(profile);
        
        // If no profile exists, create one
        if (!profile) {
          const { data: newProfile } = await supabase
            .from('user_profiles')
            .insert({ user_id: user.id, role: 'user' })
            .select()
            .single();
          setUserProfile(newProfile);
        }
      }
    };

    checkUser();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(checkUser);
    return () => subscription.unsubscribe();
  }, []);

  // Fetch announcements
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ['announcements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Announcement[];
    }
  });

  // Create announcement mutation
  const createAnnouncementMutation = useMutation({
    mutationFn: async (newAnnouncement: Omit<Announcement, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('announcements')
        .insert(newAnnouncement)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      setFormData({ title: '', content: '', image_url: '', author: '' });
      toast.success('Announcement created successfully!');
    },
    onError: (error) => {
      console.error('Error creating announcement:', error);
      toast.error('Failed to create announcement. Please try again.');
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Title and content are required.');
      return;
    }

    setIsSubmitting(true);
    try {
      await createAnnouncementMutation.mutateAsync({
        title: formData.title.trim(),
        content: formData.content.trim(),
        image_url: formData.image_url.trim() || null,
        author: formData.author.trim() || null
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isAdmin = userProfile?.role === 'admin';

  return (
    <div className="min-h-screen bg-gotham-black">
      <Navigation />
      
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-batman font-black text-4xl md:text-6xl text-bat-yellow mb-4">
              ANNOUNCEMENTS
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              "Stay informed. Knowledge is power, and power protects Gotham."
            </p>
          </div>

          {/* Admin Form - Only visible to admins */}
          {isAdmin && (
            <Card className="gotham-card mb-12 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-bat-yellow/20">
              <CardHeader>
                <CardTitle className="text-bat-yellow font-batman text-xl">
                  📢 CREATE NEW ANNOUNCEMENT
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-300 font-batman font-bold text-sm mb-2">
                        TITLE *
                      </label>
                      <Input
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="Enter announcement title..."
                        className="bg-gotham-gray border-gotham-lighter text-white placeholder-gray-400 focus:border-bat-yellow"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-batman font-bold text-sm mb-2">
                        AUTHOR
                      </label>
                      <Input
                        type="text"
                        value={formData.author}
                        onChange={(e) => handleInputChange('author', e.target.value)}
                        placeholder="Author name (optional)..."
                        className="bg-gotham-gray border-gotham-lighter text-white placeholder-gray-400 focus:border-bat-yellow"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 font-batman font-bold text-sm mb-2">
                      IMAGE URL
                    </label>
                    <Input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => handleInputChange('image_url', e.target.value)}
                      placeholder="https://example.com/image.jpg (optional)..."
                      className="bg-gotham-gray border-gotham-lighter text-white placeholder-gray-400 focus:border-bat-yellow"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-gray-300 font-batman font-bold text-sm mb-2">
                      CONTENT *
                    </label>
                    <Textarea
                      value={formData.content}
                      onChange={(e) => handleInputChange('content', e.target.value)}
                      placeholder="Enter announcement content..."
                      rows={6}
                      className="bg-gotham-gray border-gotham-lighter text-white placeholder-gray-400 focus:border-bat-yellow resize-none"
                      required
                    />
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="batman-button px-8 py-3 rounded-full font-batman font-bold text-gotham-black uppercase tracking-wide transform transition-all duration-300 hover:scale-105 disabled:scale-100 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-gotham-black border-t-transparent rounded-full animate-spin mr-2"></div>
                        Publishing...
                      </div>
                    ) : (
                      'Publish Announcement'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Announcements List */}
          <div className="space-y-8">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-16 h-16 border-4 border-bat-yellow border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : announcements.length === 0 ? (
              <Card className="gotham-card text-center py-16">
                <CardContent>
                  <div className="text-6xl mb-4">📢</div>
                  <h3 className="font-batman font-bold text-xl text-bat-yellow mb-2">
                    NO ANNOUNCEMENTS YET
                  </h3>
                  <p className="text-gray-400">
                    Check back later for important updates from Gotham.
                  </p>
                </CardContent>
              </Card>
            ) : (
              announcements.map((announcement) => (
                <Card 
                  key={announcement.id} 
                  className="gotham-card transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-bat-yellow/20"
                >
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <CardTitle className="text-bat-yellow font-batman text-xl md:text-2xl">
                        {announcement.title}
                      </CardTitle>
                      <div className="text-gray-400 text-sm font-gotham">
                        {formatDate(announcement.created_at)}
                      </div>
                    </div>
                    {announcement.author && (
                      <div className="text-gray-300 text-sm font-gotham">
                        By: {announcement.author}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    {announcement.image_url && (
                      <div className="mb-6">
                        <img
                          src={announcement.image_url}
                          alt={announcement.title}
                          className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {announcement.content}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Footer Message */}
          <div className="text-center mt-16">
            <p className="text-gray-500 text-sm italic">
              "In darkness, we find truth. In truth, we find justice."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
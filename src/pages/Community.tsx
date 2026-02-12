import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import dskOrganizerImg from '@/assets/community/dsk_organizer-2.jpg';
import organizadorCablesImg from '@/assets/community/organizador_cables-2.jpg';

const blogPosts = [
  {
    id: '1',
    title: '3D Printing for Sustainability: How Local Production Saves the Planet',
    excerpt: 'Discover how on-demand, local 3D printing is revolutionizing manufacturing and reducing carbon emissions.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop',
    author: 'Alex Chen',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
    date: 'Jan 15, 2024',
    readTime: '5 min read',
  },
  {
    id: '2',
    title: 'Maker Spotlight: Maria Santos from Madrid',
    excerpt: 'Meet Maria, one of our top-rated makers who has printed over 500 designs for customers in Spain.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=400&fit=crop',
    author: 'MakeHug Team',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
    date: 'Jan 10, 2024',
    readTime: '4 min read',
  },
  {
    id: '3',
    title: 'Design Trends 2024: What is Hot in 3D Printed Products',
    excerpt: 'From geometric minimalism to functional art - explore the design trends shaping our marketplace.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    author: 'James Park',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
    date: 'Jan 5, 2024',
    readTime: '6 min read',
  },
];

const communityPosts = [
  {
    id: '1',
    author: 'Hans Mueller',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
    location: 'Berlin, Germany',
    content: 'Just finished printing this geometric desk organizer for a local customer. The white PLA came out perfect!',
    image: dskOrganizerImg,
     likes: 47,
    comments: 12,
    time: '2 hours ago',
  },
  {
    id: '2',
    author: 'Sofia Chen',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
    location: 'Berlin, Germany',
    content: 'New design uploaded! Modular cable management system. Clean lines, functional design. What colors would you like to see?',
    image: organizadorCablesImg,
     likes: 89,
    comments: 23,
    time: '5 hours ago',
  },
  {
    id: '3',
    author: 'Kenji Yamamoto',
    authorImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop',
    location: 'Tokyo, Japan',
    content: 'Behind the scenes at my print studio. Getting ready for a batch of articulated dragons! These are so fun to make.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=600&fit=crop',
    likes: 156,
    comments: 34,
    time: '1 day ago',
  },
];

export default function Community() {
  return (
    <Layout>
      <section className="bg-gradient-hero py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="text-display-sm font-bold mb-4">Community</h1>
            <p className="text-lg text-muted-foreground">
              Stories from our makers. Inspiration from our designers. Love from our community.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8">
        <Tabs defaultValue="feed" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="feed">Community Feed</TabsTrigger>
            <TabsTrigger value="blog">Blog</TabsTrigger>
          </TabsList>

          <TabsContent value="feed">
            <div className="max-w-2xl mx-auto space-y-6">
              {communityPosts.map((post) => (
                <article key={post.id} className="bg-card rounded-2xl shadow-card overflow-hidden">
                  <div className="p-4 flex items-center gap-3">
                    <img src={post.authorImage} alt={post.author} className="h-10 w-10 rounded-full" />
                    <div>
                      <p className="font-semibold">{post.author}</p>
                      <p className="text-sm text-muted-foreground">{post.location} · {post.time}</p>
                    </div>
                  </div>
                  <div className="aspect-square">
                    <img src={post.image} alt="" className="h-full w-full object-cover" />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-4 mb-3">
                      <button className="text-muted-foreground hover:text-accent"><Heart className="h-6 w-6" /></button>
                      <button className="text-muted-foreground hover:text-foreground"><MessageCircle className="h-6 w-6" /></button>
                      <button className="text-muted-foreground hover:text-foreground"><Share2 className="h-6 w-6" /></button>
                      <button className="ml-auto text-muted-foreground hover:text-foreground"><Bookmark className="h-6 w-6" /></button>
                    </div>
                    <p className="font-semibold text-sm mb-1">{post.likes} likes</p>
                    <p className="text-sm"><span className="font-semibold">{post.author}</span> {post.content}</p>
                    <button className="text-sm text-muted-foreground mt-2">View all {post.comments} comments</button>
                  </div>
                </article>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="blog">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <article key={post.id} className="bg-card rounded-2xl shadow-card overflow-hidden card-hover">
                  <div className="aspect-[3/2]">
                    <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h2 className="font-bold text-lg mb-2 line-clamp-2">{post.title}</h2>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-3">
                      <img src={post.authorImage} alt={post.author} className="h-8 w-8 rounded-full" />
                      <div className="text-sm">
                        <p className="font-medium">{post.author}</p>
                        <p className="text-muted-foreground">{post.date} · {post.readTime}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
import { Layout } from '@/components/layout/Layout';
import sustainabilityImg from '@/assets/community/3d-printing-sustainability.png';
import mariaImg from '@/assets/community/blog_maria.jpg';
import designTrendsImg from '@/assets/community/design-trends.png';

const blogPosts = [
  {
    id: '1',
    title: '3D Printing for Sustainability: How Local Production Saves the Planet',
    excerpt: 'Discover how on-demand, local 3D printing is revolutionizing manufacturing and reducing carbon emissions.',
    image: sustainabilityImg,
    author: 'Alex Chen',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop',
    date: 'Jan 15, 2024',
    readTime: '5 min read',
  },
  {
    id: '2',
    title: 'Maker Spotlight: Maria Santos from Madrid',
    excerpt: 'Meet Maria, one of our top-rated makers who has printed over 500 designs for local customers.',
    image: mariaImg,
    author: 'MakeHug Team',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop',
    date: 'Jan 10, 2024',
    readTime: '4 min read',
  },
  {
    id: '3',
    title: 'Design Trends 2026: What is Hot in 3D Printed Products',
    excerpt: 'From geometric minimalism to functional art - explore the design trends shaping our marketplace.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    author: 'James Park',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop',
    date: 'Jan 5, 2024',
    readTime: '6 min read',
  },
];

export default function Blog() {
  return (
    <Layout>
      <section className="bg-gradient-hero py-12 md:py-16">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="text-display-sm font-bold mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground">
              Stories, insights, and trends from the world of local 3D printing.
            </p>
          </div>
        </div>
      </section>

      <div className="container py-8">
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
      </div>
    </Layout>
  );
}

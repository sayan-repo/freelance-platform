import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import Button from '../components/ui/Button';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

// The URL now points to the local image in your `public` folder.
const HERO_IMAGE_URL = '/assets/hero-background.jpg';

const HomePage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center text-center overflow-hidden">
        
        {/* CORRECTED: Background Image and Overlay */}
        <div className="absolute top-0 left-0 w-full h-full">
          <img 
            src={HERO_IMAGE_URL} 
            alt="A diverse team collaborating in a modern office"
            className="w-full h-full object-cover" 
          />
          {/* This overlay ensures the text is always readable */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
        </div>

        {/* CORRECTED: Content is now layered on top with a higher z-index */}
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              Where Great Ideas Meet Great Talent
            </h1>
            <p className="mt-6 text-lg md:text-xl text-neutral-300 max-w-2xl mx-auto">
              FreelanceHub is the premier platform connecting visionary businesses with the world's most skilled independent professionals. Build your dream team, your way.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="group">
                  Get Started <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/projects">
                <Button size="lg" variant="secondary">
                  Browse Projects
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
            <p className="mt-2 text-muted-foreground">Four simple steps to success.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard number="01" title="Post a Project" description="Clearly define your project scope, budget, and required skills. Our intuitive form makes it easy." />
            <FeatureCard number="02" title="Receive Proposals" description="Get bids from our curated pool of talented freelancers. Compare profiles, portfolios, and ratings." />
            <FeatureCard number="03" title="Collaborate Securely" description="Hire your chosen freelancer and use our platform's tools to manage communication and milestones." />
            <FeatureCard number="04" title="Pay with Confidence" description="Release payments from escrow only when you are 100% satisfied with the work delivered." />
          </div>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ number, title, description }) => (
  <Card className="text-center group hover:-translate-y-2 transition-transform duration-300">
    <div className="p-6">
      <span className="text-2xl font-bold text-primary group-hover:text-primary/80">{number}</span>
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  </Card>
);

export default HomePage;
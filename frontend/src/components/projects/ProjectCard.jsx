import { Link } from 'react-router-dom';
import { ClockIcon, UserCircleIcon, BanknotesIcon } from '@heroicons/react/24/outline';
import { formatCurrency } from '../../utils/formatters';
import Badge from '../ui/Badge';
import { Card, CardHeader, CardContent, CardFooter } from '../ui/Card';

const ProjectCard = ({ project }) => {
  return (
    <Card className="flex flex-col h-full hover:border-primary/50 transition-colors duration-300 group">
      <CardHeader>
        <div className="flex justify-between items-start gap-4">
          <Link to={`/projects/${project.id}`} className="block">
            <h3 className="text-lg font-semibold leading-tight group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </Link>
          <Badge status={project.status} />
        </div>
        <p className="text-sm text-muted-foreground pt-1 line-clamp-3">
          {project.description}
        </p>
      </CardHeader>
      
      <CardContent className="flex-grow">
        <div className="text-sm text-muted-foreground space-y-2">
          <div className="flex items-center">
            <BanknotesIcon className="w-4 h-4 mr-2" />
            <span>Budget: <span className="font-semibold text-foreground">{formatCurrency(project.budget)}</span></span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="w-4 h-4 mr-2" />
            <span>Deadline: <span className="font-semibold text-foreground">{new Date(project.deadline).toLocaleDateString()}</span></span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center text-sm">
         <div className="flex items-center text-muted-foreground">
            <UserCircleIcon className="w-5 h-5 mr-2 text-foreground" />
            <span>{project.client.username}</span>
         </div>
         <span className="font-semibold text-primary">{project.bidsCount || 0} Bids</span>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
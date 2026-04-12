import { useNavigate } from 'react-router-dom';
import { SignInCard2 } from '../components/ui/sign-in-card-2';

export default function AuthPage() {
  const navigate = useNavigate();

  const handleAuthSuccess = () => {
    // Navigate to dashboard — DashboardPage handles its own loading state
    navigate('/dashboard');
  };

  return (
    <div className="relative">
      <SignInCard2 onAuthSuccess={handleAuthSuccess} />
    </div>
  );
}

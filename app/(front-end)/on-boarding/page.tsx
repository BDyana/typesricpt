import { getUserProfile } from '@/actions/update-profile';
import OnboardingForm from '@/components/forms/onboarding-form';
import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';

export default async function page() {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  const userId = user?.id;

  const userProfile = await getUserProfile(userId);

  // console.log('User Profile:', userProfile?.data);
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-background flex items-center justify-center p-8">
      <div className="w-full m-8 max-w-4xl">
        <OnboardingForm userProfile={userProfile?.data as any} />
      </div>
    </div>
  );
}

import OnboardingForm from '@/components/forms/onboarding-form';

export default function page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <OnboardingForm />
      </div>
    </div>
  );
}

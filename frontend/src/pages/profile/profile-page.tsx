import { FormCard } from '@/components/widgets';
import { cn } from '@/libs/cn';

import ProfileForm from './profile-form';

const ProfilePage = () => {
  return (
    <div className={cn('region', 'wrapper', 'flex', 'justify-center')}>
      <FormCard>
        <FormCard.Header>
          <FormCard.Title>Personal</FormCard.Title>
          <FormCard.Description>
            Please fill the fields below to update your personal data.
          </FormCard.Description>
        </FormCard.Header>
        <FormCard.Body>
          <ProfileForm />
        </FormCard.Body>
      </FormCard>
    </div>
  );
};

export default ProfilePage;

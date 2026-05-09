import { FormCard, GoBack } from '@/components/widgets';
import { cn } from '@/libs/cn';
import { useSecondaryPage } from '@/hooks';

import ProfileForm from './profile-form';

const ProfilePage = () => {
  useSecondaryPage();

  return (
    <>
      <GoBack>
        <GoBack.Control />
      </GoBack>
      <div
        className={cn(
          'region-end',
          'wrapper',
          'flex',
          'flex-col',
          'items-center',
          'gap-8',

          'md:gap-24',
        )}
      >
        <h1
          className={cn(
            'text-center',
            'text-xl',

            'lg:text-2xl',

            'text-black',
            'uppercase',
          )}
        >
          My profile
        </h1>
        <div
          className={cn(
            'inline-full',
            'flex',
            'flex-col',
            'items-center',
            'gap-8',

            'md:gap-16',
          )}
        >
          <FormCard>
            <FormCard.Header>
              <h2 className={cn('h6')}>Personal Info</h2>
            </FormCard.Header>
            <FormCard.Body>
              <ProfileForm />
            </FormCard.Body>
          </FormCard>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

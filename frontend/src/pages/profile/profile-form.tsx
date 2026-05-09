import { useSelector } from 'react-redux';

import { selectUser } from '@/app/features/auth';
import { useUpdateProfileMutation } from '@/app/services/users-api';
import { Button, Input, Label, Spinner } from '@/components/ui';
import { FormField, FormFieldAlert, FormFieldFlow } from '@/components/widgets';
import { useProfileForm, useSecondaryPage } from '@/hooks';
import type { ProfileFormData } from '@/libs/schemas';
import { cn } from '@/libs/cn';

const ProfileForm = () => {
  useSecondaryPage();

  const authUser = useSelector(selectUser);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValues,
    formState: { errors },
  } = useProfileForm();

  const onSubmit = async (data: ProfileFormData) => {
    try {
      console.log('Updating your profile...', data);
      const {
        user: { name, email },
      } = await updateProfile(data).unwrap();
      reset();
      setValues({ name, email });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormFieldFlow>
        <FormField>
          <Label
            htmlFor='name'
            isInvalid={!!errors.name}
          >
            Name
          </Label>
          <Input
            type='text'
            id='name'
            autoComplete='name'
            placeholder='John Doe'
            defaultValue={authUser?.name}
            required
            aria-required
            aria-describedby='nameAlert'
            isInvalid={!!errors.name}
            {...register('name')}
          />
          {errors.name && (
            <FormFieldAlert id='nameAlert'>
              {errors.name.message}
            </FormFieldAlert>
          )}
        </FormField>
        <FormField>
          <Label
            htmlFor='email'
            isInvalid={!!errors.email}
          >
            Email
          </Label>
          <Input
            type='email'
            inputMode='email'
            id='email'
            autoComplete='email'
            placeholder='johndoe@example.com'
            defaultValue={authUser?.email}
            required
            aria-required
            aria-describedby='emailAlert'
            isInvalid={!!errors.email}
            {...register('email')}
          />
          {errors.email && (
            <FormFieldAlert id='emailAlert'>
              {errors.email.message}
            </FormFieldAlert>
          )}
        </FormField>
        <Button
          type='submit'
          variant='primary'
          disabled={isLoading}
          className={cn('self-end')}
        >
          {isLoading ? (
            <>
              <Spinner
                variant='primary'
                size='sm'
                aria-labelledby='actionAlert'
              />{' '}
              <span id='actionAlert'>Saving changes...</span>
            </>
          ) : (
            <>Save changes</>
          )}
        </Button>
      </FormFieldFlow>
    </form>
  );
};

export default ProfileForm;

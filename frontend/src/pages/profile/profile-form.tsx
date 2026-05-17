import { useUpdateProfileMutation } from '@/app/services/users-api';
import { Button, Input, Label, Spinner } from '@/components/ui';
import { FormField, FormFieldAlert, FormFieldFlow } from '@/components/widgets';
import { useProfileForm, useSecondaryPage, useToast } from '@/hooks';
import type { ProfileFormData } from '@/libs/schemas';
import { cn } from '@/libs/cn';
import type { ApiError } from '@/libs/types';

const ProfileForm = () => {
  useSecondaryPage();

  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useProfileForm();

  const toast = useToast();

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const {
        user: { name, email },
      } = await updateProfile(data).unwrap();

      reset({ name, email });
    } catch (error) {
      const apiError = error as ApiError;

      if (apiError.status === 409) {
        setError('email', {
          message: 'This email is already in use.',
        });
        return;
      }

      toast.error({
        title: 'Profile update failed',
        description: 'Something went wrong. Please try again.',
      });
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
            required
            aria-required
            aria-describedby={errors.name ? 'nameAlert' : undefined}
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
            required
            aria-required
            aria-describedby={errors.email ? 'emailAlert' : undefined}
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

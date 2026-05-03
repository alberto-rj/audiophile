import { Button, Card, Input } from '@/components/ui';
import { cn } from '@/libs/cn';

const LoginPage = () => {
  return (
    <Card>
      <h1
        className={cn(
          'text-xl',

          'lg:text-2xl',

          'text-black',
          'uppercase',
        )}
      >
        Your account
      </h1>
      <form>
        <div>
          <label htmlFor='email'>Email</label>
          <Input
            id='email'
            type='email'
            inputMode='email'
            name='email'
            autoComplete='email'
            placeholder='Your email'
            required
            aria-required
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <Input
            id='password'
            type='password'
            name='password'
            autoComplete='current-password'
            placeholder='Your password'
            required
            aria-required
          />
        </div>

        <Button
          type='submit'
          variant='primary'
        >
          Login
        </Button>
      </form>
    </Card>
  );
};

export default LoginPage;

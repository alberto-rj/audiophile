import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectUser } from '@/app/features/auth';
import { useLogoutMutation } from '@/app/services/auth-api';
import { ChevronDown } from '@/assets/icons';
import { DropdownMenu } from '@/components/ui';
import { StatusVisuallyHidden } from '@/components/widgets';
import { APP_ROUTES } from '@/config/app-routes';
import { cn } from '@/libs/cn';
import { getNameInitials } from '@/libs/helpers';
import { useToast } from '@/hooks';

interface ProfileMenuProps {
  isOnMobile?: boolean;
}

const ProfileMenu = ({ isOnMobile = true }: ProfileMenuProps) => {
  const user = useSelector(selectUser)!;

  const [logoutUser, { isLoading: isLoggingOut }] = useLogoutMutation();

  const toast = useToast();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
    } catch {
      toast.error({
        title: 'Sign out failed',
        description: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <>
      <StatusVisuallyHidden>
        {isLoggingOut ? 'Signing you out...' : ''}
      </StatusVisuallyHidden>
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <button
            data-testid='profileMenuTrigger'
            type='button'
            aria-label={`Account menu for ${user.name}`}
            className={cn(
              'flex',
              'items-center',
              'gap-2',

              'cursor-pointer',
            )}
          >
            <div
              className={cn(
                'inline-9',
                'block-9',
                'aspect-36/36',
                'flex',
                'justify-center',
                'items-center',
                'text-xs',
                'text-center',

                'text-black',
                'bg-white',
                'object-cover',
                'rounded-full',
                'select-none',
                'uppercase',
              )}
            >
              {getNameInitials(user.name)}
            </div>
            <ChevronDown
              focusable={false}
              aria-hidden={true}
              className={cn('stroke-white')}
            />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            side={isOnMobile ? 'top' : undefined}
            data-testid='profileMenu'
            className={cn(
              'absolute',
              'inset-s-1/2',
              '-translate-x-1/2',
              'z-100',
            )}
          >
            <DropdownMenu.Label
              className={cn('flex', 'flex-col', 'items-center')}
            >
              <span
                className={cn(
                  'text-2xs',
                  'truncate',

                  'text-black',
                  'uppercase',
                )}
              >
                {user.name}
              </span>
              <span
                className={cn(
                  'truncate',

                  'text-2xs',
                )}
              >
                {user.email}
              </span>
            </DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>
              <Link
                to={APP_ROUTES.profile}
                className={cn('outline-none', 'text-inherit')}
              >
                My Profile
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <Link
                to={APP_ROUTES.orders}
                className={cn('outline-none', 'text-inherit')}
              >
                My Orders
              </Link>
            </DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              data-testid={'signOutItem'}
              disabled={isLoggingOut || undefined}
              onSelect={handleLogout}
            >
              Sign out
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu>
    </>
  );
};

export default ProfileMenu;

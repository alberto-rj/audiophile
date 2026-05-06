import { ChevronDown } from '@/assets/icons';
import { DropdownMenu } from '@/components/ui';
import { cn } from '@/libs/cn';

const UserProfileMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <button
          type='button'
          className={cn('flex', 'items-center', 'gap-2')}
        >
          <div
            className={cn(
              'inline-12',
              'block-12',
              'aspect-48/48',

              'object-cover',
              'rounded-full',
              'bg-gray-600',
            )}
          ></div>
          <ChevronDown
            focusable={false}
            aria-hidden={true}
          />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <DropdownMenu.Label>johndoe@example.com</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Profile</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Log out</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu>
  );
};

export default UserProfileMenu;

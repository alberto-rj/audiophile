import { ArrowRight } from '@/assets/icons';
import { AppIcon } from '@/components/ui';

function App() {
  return (
    <>
      <h1 className='text-3xl text-danger-400 font-extrabold'>
        Hello World <AppIcon Icon={ArrowRight} />
      </h1>
    </>
  );
}

export default App;

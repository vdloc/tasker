import { LoginFormValues } from '@/types';
import Input from '../forms/components/Input';
import { useForm } from 'react-hook-form';
import Button from '../Button';
import { signInUser } from '@/firebase';
import SocialButton from './SocialButton';
import GoogleIcon from '../icons/GoogleIcon';
import GithubIcon from '../icons/GithubIcon';
import UserIcon from '../icons/UserIcon';

export default function LoginCard() {
  const { control, handleSubmit } = useForm<LoginFormValues>({
    defaultValues: {},
  });

  async function onSubmit(data: LoginFormValues) {
    const { email, password } = data;
    const user = await signInUser(email, password);
    console.log(user);
  }

  return (
    <div className='space-y-2 px-4 py-8 rounded-2xl bg-white shadow-2xl drop-shadow-2xl w-[25rem] relative z-10'>
      <header className='py-4 text-center'>
        <h1 className='text-3xl font-bold'>TooDoo</h1>
        <p className='text-sm font-semibold mt-3'> -*- The to-do app -*- </p>
      </header>
      <form
        className='py-4 w-2/3 mx-auto divide-y-2 divide-dashed'
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className='space-y-6 pb-3'>
          <Input
            control={control}
            label='Email'
            name='email'
            id='email'
            rules={{ required: { value: true, message: 'Email is required!' } }}
          />
          <Input
            control={control}
            label='Password'
            name='password'
            id='password'
            rules={{
              required: { value: true, message: 'Password is required!' },
            }}
            type='password'
          />
          <Button
            label='Login'
            className='w-full justify-center'
            type='submit'
          />
        </section>
        <section className='space-y-6 mt-3 pt-6'>
          <h5 className='text-center text-sm font-medium'>
            {' '}
            Or with social accounts:
          </h5>
          <SocialButton Icon={GoogleIcon} label='Sign in with Google' />
          <SocialButton Icon={GithubIcon} label='Sign in with Github' />
          <SocialButton Icon={UserIcon} label='Sign in as guest' />
        </section>
      </form>
    </div>
  );
}

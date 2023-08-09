import { signInUser, signInWithAnonymously, signInWithGithub, signInWithGoogle } from '@/firebase/auth';
import { useSettingsStore } from '@/store';
import { User, UserSignInFormValues } from '@/types';
import { getAuthErrorMessage } from '@/utils';
import Button from '@components/common/Button';
import SocialButton from '@components/common/SocialButton';
import { GithubIcon, GoogleIcon, UserIcon } from '@components/icons';
import configs from '@data/configs.json';
import { FirebaseError } from 'firebase/app';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../components/Input';

const {
  app: { name, description },
} = configs;

export default function UserSignInForm() {
  const { control, handleSubmit } = useForm<UserSignInFormValues>({
    defaultValues: { email: '', password: '' },
  });
  const { setUser } = useSettingsStore();
  const navigate = useNavigate();

  async function handleSignIn(signInPromise: Promise<User>) {
    try {
      const user = await signInPromise;
      setUser(user as User);
      navigate('/');
      toast.success(`Welcome ${user.displayName || 'Captain Unknown'}!`);
    } catch (error) {
      const firebaseError = error as FirebaseError;
      toast.error(getAuthErrorMessage(firebaseError.code), {
        id: firebaseError.code,
      });
    }
  }

  async function onSubmit(data: UserSignInFormValues) {
    const { email, password } = data;
    handleSignIn(signInUser(email, password));
  }

  async function handleGoogleSignIn() {
    handleSignIn(signInWithGoogle());
  }

  async function handleGithubSignIn() {
    handleSignIn(signInWithGithub());
  }

  async function handleAnonymouslySignIn() {
    handleSignIn(signInWithAnonymously());
  }

  return (
    <div className="w-full h-screen md:h-auto flex flex-col justify-center overflow-hidden md:w-[20rem] py-6 px-4 mx-auto relative z-10 rounded-2xl bg-white shadow-2xl drop-shadow-2xl">
      <header className="pt-4 text-center">
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-base mt-1 italic font-medium">{description}</p>
        <p className="text-sm mt-8 font-medium">Sign in to your account</p>
      </header>
      <form className="py-4 divide-y-2 divide-dashed" onSubmit={handleSubmit(onSubmit)}>
        <section className="space-y-4 md:space-y-6 pb-3">
          <Input
            control={control}
            label="Email"
            name="email"
            id="email"
            rules={{ required: { value: true, message: 'Email is required!' } }}
          />
          <Input
            control={control}
            label="Password"
            name="password"
            id="password"
            rules={{
              required: { value: true, message: 'Password is required!' },
            }}
            type="password"
          />
          <Button label="Login" className="w-full justify-center" type="submit" />
        </section>
        <section className="space-y-4 md:space-y-6 mt-3 py-3">
          <h5 className="text-center text-sm font-medium"> Or with social accounts:</h5>
          <SocialButton Icon={GoogleIcon} label="Sign in with Google" onClick={handleGoogleSignIn} />
          <SocialButton Icon={GithubIcon} label="Sign in with Github" onClick={handleGithubSignIn} />
          <SocialButton Icon={UserIcon} label="Sign in as guest" onClick={handleAnonymouslySignIn} />
        </section>
        <section className=" mt-3 pt-3">
          <h5 className="text-center text-sm font-medium">
            {' '}
            Don&apos;t have an account?{' '}
            <Link to="/sign-up" className="text-indigo-700">
              Sign up
            </Link>{' '}
            now.{' '}
          </h5>
        </section>
      </form>
    </div>
  );
}

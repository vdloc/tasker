import { User, UserSignInFormValues } from '@/types';
import Input from '../components/Input';
import { useForm } from 'react-hook-form';
import Button from '../../common/Button';
import { signInUser } from '@/firebase';
import SocialButton from './SocialButton';
import { useStore } from '@/store';
import { GoogleIcon, GithubIcon, UserIcon } from '@/components/icons';
import { Link, useNavigate } from 'react-router-dom';
import configs from '@/data/configs.json';

const {
  app: { name, description },
} = configs;

export default function UserSignInForm() {
  const { control, handleSubmit } = useForm<UserSignInFormValues>({
    defaultValues: {},
  });
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  async function onSubmit(data: UserSignInFormValues) {
    const { email, password } = data;
    try {
      const user = await signInUser(email, password);
      setUser(user as User);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-[20rem] py-6 px-4 mx-auto">
      <header className="pt-4 text-center">
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-base mt-1 italic font-medium">{description}</p>
        <p className="text-sm mt-8 font-medium">Sign in to your account</p>
      </header>
      <form className="py-4 divide-y-2 divide-dashed" onSubmit={handleSubmit(onSubmit)}>
        <section className="space-y-6 pb-3">
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
        <section className="space-y-6 mt-3 py-3">
          <h5 className="text-center text-sm font-medium"> Or with social accounts:</h5>
          <SocialButton Icon={GoogleIcon} label="Sign in with Google" />
          <SocialButton Icon={GithubIcon} label="Sign in with Github" />
          <SocialButton Icon={UserIcon} label="Sign in as guest" />
        </section>
        <section className=" mt-3 pt-3">
          <h5 className="text-center text-sm font-medium">
            {' '}
            Don&apos;t have an account?{' '}
            <Link to="/sign-up" className="text-indigo-700">
              Sign Up
            </Link>{' '}
            now.{' '}
          </h5>
        </section>
      </form>
    </div>
  );
}

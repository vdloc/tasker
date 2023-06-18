import { User, UserSignUpFormValues } from '@/types';
import Input from '../components/Input';
import { useForm } from 'react-hook-form';
import Button from '../../common/Button';
import { createUser } from '@/firebase';
import { useStore } from '@/store';
import { GoogleIcon, GithubIcon } from '@/components/icons';
import { Link, useNavigate } from 'react-router-dom';
import configs from '@/data/configs.json';
import SocialButton from '@/components/common/SocialButton';

const {
  app: { name, description },
} = configs;

export default function UserSignUpForm() {
  const { control, handleSubmit } = useForm<UserSignUpFormValues>({
    defaultValues: {},
  });
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  async function onSubmit(data: UserSignUpFormValues) {
    const { email, password } = data;
    try {
      const user = await createUser(email, password);
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
        <p className="text-sm mt-8 font-medium">Sign up an account</p>
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
          <Input
            control={control}
            label="Re-enter password"
            name="confirmPassword"
            id="confirmPassword"
            rules={{
              required: { value: true, message: 'Please re-enter password!' },
            }}
            type="password"
          />
          <Button label="Register" className="w-full justify-center" type="submit" />
        </section>
        <section className="space-y-6 mt-3 py-3">
          <h5 className="text-center text-sm font-medium"> Or with social accounts:</h5>
          <SocialButton Icon={GoogleIcon} label="Sign up with Google" />
          <SocialButton Icon={GithubIcon} label="Sign up with Github" />
        </section>
        <section className=" mt-3 pt-3">
          <h5 className="text-center text-sm font-medium">
            {' '}
            Already have an account?{' '}
            <Link to="/sign-in" className="text-indigo-700">
              Sign in
            </Link>{' '}
            now.{' '}
          </h5>
        </section>
      </form>
    </div>
  );
}

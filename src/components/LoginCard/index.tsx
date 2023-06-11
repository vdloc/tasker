import { LoginFormValues } from '@/types';
import Input from '../forms/components/Input';
import { useForm } from 'react-hook-form';
import Button from '../Button';

export default function LoginCard() {
  const { control, handleSubmit } = useForm<LoginFormValues>({ defaultValues: {} });

  function onSubmit() {}
  return (
    <div className="space-y-2 p-4 rounded-lg bg-white shadow-2xl w-[25rem] relative z-10">
      <header className="py-4 text-center">
        <h1 className="text-3xl font-bold">Welcome to the TooDoo</h1>
        <span className="text-sm font-semibold"> -*- The to-do app -*- </span>
        <h3 className="font-semibold mt-4">Please login to use the app.</h3>
      </header>
      <form className="py-4 w-1/2 mx-auto space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
          rules={{ required: { value: true, message: 'Password is required!' } }}
          type="password"
        />
        <Button label="Login" className="w-full justify-center" type="submit" />

        <p className="font-semibold mt-4">Or</p>
      </form>
    </div>
  );
}

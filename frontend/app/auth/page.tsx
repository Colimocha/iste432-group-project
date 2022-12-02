'use client';

import { authEmployee, authSocietyContact, authVoter } from '#/lib/api/auth';
import { delay } from '#/lib/delay';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';

export default function AuthPage() {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isVoter, setIsVoter] = useState(false);
  const roleRef = useRef<HTMLSelectElement | null>(null);
  const input_1_Ref = useRef<HTMLInputElement | null>(null);
  const input_2_Ref = useRef<HTMLInputElement | null>(null);
  const rememberMeRef = useRef<HTMLInputElement | null>(null);

  const router = useRouter();

  const handleSelectRoleChange = () =>
    setIsVoter(roleRef.current?.value === 'v');

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const role = roleRef.current?.value;

    if (role === 'v') {
      setLoading(true);
      delay().then(() => {
        authVoter({
          cred_1: input_1_Ref.current?.value!,
          cred_2: input_2_Ref.current?.value!,
        })
          .then((res) => {
            sessionStorage.setItem('token', res.access_token);
            sessionStorage.setItem('role', 'voter');
            sessionStorage.setItem('voterId', res.id);
            router.push('/voter');
          })
          .catch((err) => {
            setLoading(false);
            setError(true);
          })
          .finally(() => {
            setLoading(false);
          });
      });
    } else if (role === 'sc') {
      setLoading(true);
      delay().then(() => {
        authSocietyContact({
          username: input_1_Ref.current?.value!,
          password: input_2_Ref.current?.value!,
        })
          .then((res) => {
            sessionStorage.setItem('token', res.access_token);
            sessionStorage.setItem('role', 'society_contact');
            router.push('/dashboard');
          })
          .catch((err) => {
            setLoading(false);
            setError(true);
          })
          .finally(() => {
            setLoading(false);
          });
      });
    } else {
      setLoading(true);
      delay().then(() => {
        authEmployee({
          username: input_1_Ref.current?.value!,
          password: input_2_Ref.current?.value!,
        })
          .then((res) => {
            sessionStorage.setItem('token', res.access_token);
            sessionStorage.setItem('role', 'employee');
            router.push('/dashboard');
          })
          .catch((err) => {
            setLoading(false);
            setError(true);
          })
          .finally(() => {
            setLoading(false);
          });
      });
    }
  };

  return (
    <>
      <div className="rounded-md bg-gray-200 p-5 shadow-lg lg:p-10">
        <h1 className="mb-6 text-4xl font-bold">Sign In</h1>
        <form className="mt-3 w-[400px] space-y-6">
          {/* Username */}
          <div>
            <label
              htmlFor={isVoter ? 'credential_1' : 'username'}
              className="sr-only"
            >
              {isVoter ? 'Credential 1' : 'Username'}
            </label>
            <input
              id={isVoter ? 'credential_1' : 'username'}
              name={isVoter ? 'credential_1' : 'username'}
              type="text"
              autoComplete={isVoter ? 'credential_1' : 'username'}
              required
              className="input w-full"
              placeholder={isVoter ? 'Credential 1' : 'Username'}
              ref={input_1_Ref}
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor={isVoter ? 'credential_2' : 'password'}
              className="sr-only"
            >
              {isVoter ? 'Credential 2' : 'Password'}
            </label>
            <input
              id={isVoter ? 'credential_2' : 'password'}
              name={isVoter ? 'credential_2' : 'password'}
              type={isVoter ? 'text' : 'password'}
              autoComplete="current-password"
              required
              className="input w-full"
              placeholder={isVoter ? 'Credential 2' : 'Password'}
              ref={input_2_Ref}
            />
          </div>

          {/* select role */}
          <div>
            <label htmlFor="role" className="sr-only">
              Role
            </label>
            <select
              id="role"
              name="role"
              autoComplete="role"
              required
              className="select w-full"
              placeholder="Role"
              ref={roleRef}
              onChange={handleSelectRoleChange}
              defaultValue=""
            >
              <option value="" disabled>
                None
              </option>
              <option value="v">Voter</option>
              <option value="sc">Society Contact</option>
              <option value="e">Employee</option>
            </select>
          </div>

          {/* Remember Me and Forget Password */}
          {/* <div className="flex items-center justify-between">
            <div className="form-control">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  className="checkbox"
                  ref={rememberMeRef}
                />
                <span className="label-text ml-2">Remember me</span>
              </label>
            </div>
            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Forgot your password?
              </a>
            </div>
          </div> */}
          <div>
            <button
              className={clsx('btn-primary btn w-full', {
                loading: isLoading,
              })}
              onClick={handleSubmit}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

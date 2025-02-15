import Link from 'next/link';
import React from 'react';

const SignInPage = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="gap-4">
        <Link href={'/'}>home</Link>
        <Link href={'/dashboard'}>Dashboard</Link>
      </div>
    </div>
  );
};

export default SignInPage;

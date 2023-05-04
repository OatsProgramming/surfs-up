'use client'; // Error components must be Client components

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Gears from '@/app/components/errors/Gears/Gears';
import styles from './error.module.css'
import { signOut } from 'next-auth/react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter()
  
  useEffect(() => {
    console.error(error);
  }, [error]);

  function handleClick() {
    signOut()
    router.push('/')
  }

  return (
    <>
      {/* <Gears /> */}
      <div className={styles['main']}>
        <div className={styles['message']}>
          <h1>
            Something went wrong...
          </h1>
          <div style={{ opacity: 0.7 }}>
            {error.message}
          </div>
          <div className={styles['btnContainer']}>
            <button
              onPointerDown={
                () => reset()
              }
            >
              Try again?
            </button>
            <button
              onPointerDown={handleClick}
            >
              Login Page
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

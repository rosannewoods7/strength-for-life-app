'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import styles from './page.module.css'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [usePassword, setUsePassword] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('error')) {
      setError(params.get('error').replace(/_/g, ' '))
    }

    const restoreSession = async () => {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()
      if (session) {
        window.location.href = '/dashboard'
      }
    }
    restoreSession()
  }, [])

  const handlePasswordLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setMessage('Success! Redirecting...')
      window.location.href = '/dashboard'
    }
  }

  const handleSendCode = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)

    const supabase = createClient()

    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        shouldCreateUser: true,
      },
    })

    if (error) {
      setError(error.message)
    } else {
      setIsCodeSent(true)
      setMessage('We just emailed you a secure code. Please enter it below.')
    }
    setLoading(false)
  }

  const handleVerifyCode = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)

    const supabase = createClient()

    const { error } = await supabase.auth.verifyOtp({
      email: email.trim().toLowerCase(),
      token: otpCode,
      type: 'email',
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      setMessage('Success! Redirecting...')
      window.location.href = '/dashboard'
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.brandHeader}>
          <h1>Strength for Life</h1>
          <p>Strength &amp; Longevity System</p>
        </div>
        
        {!isCodeSent ? (
          <form onSubmit={usePassword ? handlePasswordLogin : handleSendCode} className={styles.form}>
            <h2>Member Sign In</h2>
            <p className={styles.instructions}>
              {usePassword
                ? 'Enter your email and password to access your program.'
                : 'Enter the email address you used to register. We will send you a secure login code.'}
            </p>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            {usePassword && (
              <div className={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                />
              </div>
            )}

            <button 
              type="submit" 
              className={styles.button} 
              disabled={loading}
            >
              {loading
                ? 'Signing in...'
                : usePassword
                ? 'Sign In with Password'
                : 'Send Secure Email Code'}
            </button>

            <button
              type="button"
              className={styles.textButton}
              onClick={() => {
                setUsePassword(!usePassword)
                setError(null)
              }}
            >
              {usePassword
                ? 'Prefer a one-time email code instead?'
                : 'Signed up with a password? Click here to log in with password'}
            </button>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <div style={{ textAlign: 'center', marginTop: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-lavender-grey)', fontSize: '0.92rem' }}>
              New here?{' '}
              <Link href="/trial" style={{ color: 'var(--color-deep-plum)', fontWeight: 700, textDecoration: 'underline' }}>
                Start your 7-Day Free Trial &rarr;
              </Link>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className={styles.form}>
            <h2>Enter Code</h2>
            <p className={styles.instructions}>
              We sent a secure code to <strong>{email}</strong>.
            </p>

            <div className={styles.inputGroup}>
              <label htmlFor="otpCode">Secure Code</label>
              <input
                id="otpCode"
                type="text"
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="12345678"
                required
                className={styles.codeInput}
              />
            </div>

            <button 
              type="submit" 
              className={styles.button} 
              disabled={loading || otpCode.length < 6}
            >
              {loading ? 'Verifying...' : 'Log In'}
            </button>

            {message && <div className={styles.successMessage}>{message}</div>}
            {error && <div className={styles.errorMessage}>{error}</div>}
            
            <button 
              type="button"
              className={styles.textButton}
              onClick={() => setIsCodeSent(false)}
              disabled={loading}
            >
              Didn't receive it? Try another email
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

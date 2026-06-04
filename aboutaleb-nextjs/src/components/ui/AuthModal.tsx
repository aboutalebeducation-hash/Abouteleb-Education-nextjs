'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useLang } from '@/hooks/useLang'
import { useAuth } from '@/hooks/useAuth'
import toast from 'react-hot-toast'

interface AuthModalProps {
  open: boolean
  onClose: () => void
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const { t } = useLang()
  const { user, signIn, signUp, signOut } = useAuth()
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Reset on open
  useEffect(() => {
    if (open) { setEmail(''); setPassword(''); setConfirm(''); setError('') }
  }, [open])

  if (!open) return null

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) { setError(error) }
    else { toast.success(t.auth.loginBtn); onClose() }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirm) { setError('كلمتا المرور غير متطابقتين'); return }
    setLoading(true); setError('')
    const { error } = await signUp(email, password)
    setLoading(false)
    if (error) { setError(error) }
    else { toast.success('تم إنشاء الحساب بنجاح!'); onClose() }
  }

  const handleLogout = async () => {
    await signOut()
    toast.success(t.auth.logoutBtn)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black/80 z-[3000] flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white max-w-[420px] w-full rounded-3xl p-7 relative text-right shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 start-5 text-slate-400 hover:text-slate-700 transition-colors"
        >
          <X size={24} />
        </button>

        {user ? (
          /* Logged-in state */
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-[#C0392B]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-user text-[#C0392B] text-2xl" />
            </div>
            <p className="font-bold text-slate-700 mb-1">{user.email}</p>
            <p className="text-slate-400 text-xs mb-6">مرحباً بك</p>
            <button
              onClick={handleLogout}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl transition-all"
            >
              {t.auth.logoutBtn}
            </button>
          </div>
        ) : (
          /* Login / Signup */
          <>
            {/* Tabs */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setTab('login')}
                className={`px-5 py-2 rounded-full font-bold text-sm transition-all
                  ${tab === 'login' ? 'bg-[#C0392B] text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
              >
                {t.auth.loginTab}
              </button>
              <button
                onClick={() => setTab('signup')}
                className={`px-5 py-2 rounded-full font-bold text-sm transition-all
                  ${tab === 'signup' ? 'bg-[#C0392B] text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
              >
                {t.auth.signupTab}
              </button>
            </div>

            {tab === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <h3 className="font-black text-lg text-slate-900">{t.auth.loginTitle}</h3>
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-slate-600">{t.auth.email}</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-cairo focus:outline-none focus:border-[#C0392B] transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-slate-600">{t.auth.password}</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-cairo focus:outline-none focus:border-[#C0392B] transition-all" />
                </div>
                {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full bg-[#C0392B] text-white py-3 rounded-xl font-black text-sm
                    hover:bg-[#9a2e22] disabled:opacity-70 transition-all flex items-center justify-center gap-2">
                  {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  {t.auth.loginBtn}
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <h3 className="font-black text-lg text-slate-900">{t.auth.signupTitle}</h3>
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-slate-600">{t.auth.email}</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-cairo focus:outline-none focus:border-[#C0392B] transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-slate-600">{t.auth.password}</label>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-cairo focus:outline-none focus:border-[#C0392B] transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1.5 text-slate-600">{t.auth.confirmPassword}</label>
                  <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-cairo focus:outline-none focus:border-[#C0392B] transition-all" />
                </div>
                {error && <p className="text-red-500 text-xs text-center">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full bg-[#C0392B] text-white py-3 rounded-xl font-black text-sm
                    hover:bg-[#9a2e22] disabled:opacity-70 transition-all flex items-center justify-center gap-2">
                  {loading && <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                  {t.auth.signupBtn}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  )
}

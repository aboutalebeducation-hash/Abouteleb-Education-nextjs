'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import type { Student, Lead } from '@/types/database'
import { LogOut, User, FileText, Clock, CheckCircle, XCircle, BookOpen } from 'lucide-react'

const STATUS_COLORS: Record<string, string> = {
  prospect: 'bg-slate-100 text-slate-600',
  applied: 'bg-blue-100 text-blue-600',
  accepted: 'bg-green-100 text-green-700',
  enrolled: 'bg-emerald-100 text-emerald-700',
  graduated: 'bg-purple-100 text-purple-700',
  new: 'bg-yellow-100 text-yellow-700',
  contacted: 'bg-blue-100 text-blue-600',
  cancelled: 'bg-red-100 text-red-600',
}

const STATUS_LABELS_AR: Record<string, string> = {
  prospect: 'مستجد', applied: 'قدّم طلبه', accepted: 'مقبول',
  enrolled: 'مسجّل', graduated: 'تخرّج',
  new: 'طلب جديد', contacted: 'تم التواصل', cancelled: 'ملغي',
}

export default function DashboardPage() {
  const { user, signOut, loading } = useAuth()
  const router = useRouter()
  const [student, setStudent] = useState<Student | null>(null)
  const [myLeads, setMyLeads] = useState<Lead[]>([])
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    if (!loading && !user) router.push('/')
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    const load = async () => {
      const [{ data: st }, { data: leads }] = await Promise.all([
        supabase.from('students').select('*').eq('user_id', user.id).single(),
        supabase.from('leads').select('*').eq('email', user.email!).order('created_at', { ascending: false }),
      ])
      setStudent(st)
      setMyLeads(leads ?? [])
      setFetching(false)
    }
    load()
  }, [user])

  if (loading || fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="w-10 h-10 border-4 border-[#C0392B]/20 border-t-[#C0392B] rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-slate-50 font-cairo" dir="rtl">
      {/* Header */}
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-black text-lg">لوحة التحكم</h1>
          <p className="text-slate-400 text-xs">{user.email}</p>
        </div>
        <button
          onClick={() => { signOut(); router.push('/') }}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-semibold transition-all"
        >
          <LogOut size={14} /> تسجيل الخروج
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-[#C0392B]/10 rounded-full flex items-center justify-center">
              <User size={24} className="text-[#C0392B]" />
            </div>
            <div>
              <h2 className="font-black text-lg">{student?.full_name || 'الطالب'}</h2>
              <p className="text-slate-500 text-sm">{user.email}</p>
            </div>
            {student?.status && (
              <span className={`ms-auto text-xs font-bold px-3 py-1 rounded-full ${STATUS_COLORS[student.status]}`}>
                {STATUS_LABELS_AR[student.status]}
              </span>
            )}
          </div>

          {student ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-slate-100 text-sm">
              {[
                { label: 'التخصص', value: student.major },
                { label: 'الجنسية', value: student.nationality },
                { label: 'تاريخ الميلاد', value: student.date_of_birth },
                { label: 'الهاتف', value: student.phone },
                { label: 'جواز السفر', value: student.passport_no },
                { label: 'سنة الالتحاق', value: student.enrollment_year?.toString() },
              ].map(({ label, value }) =>
                value ? (
                  <div key={label}>
                    <span className="text-slate-400 text-xs block">{label}</span>
                    <span className="font-semibold text-slate-700">{value}</span>
                  </div>
                ) : null
              )}
            </div>
          ) : (
            <p className="text-slate-400 text-sm mt-2">لم يتم إنشاء ملفك الطلابي بعد. تواصل معنا لإتمام التسجيل.</p>
          )}
        </div>

        {/* My Applications */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
          <h3 className="font-black text-base mb-4 flex items-center gap-2">
            <FileText size={18} className="text-[#C0392B]" /> طلباتي
          </h3>
          {myLeads.length === 0 ? (
            <p className="text-slate-400 text-sm">لا توجد طلبات بعد. أرسل طلبك من الصفحة الرئيسية.</p>
          ) : (
            <div className="space-y-3">
              {myLeads.map(lead => (
                <div key={lead.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                  <div>
                    <p className="font-bold text-sm text-slate-800">{lead.major}</p>
                    <p className="text-slate-400 text-xs">{new Date(lead.created_at).toLocaleDateString('ar-EG')}</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${STATUS_COLORS[lead.status]}`}>
                    {STATUS_LABELS_AR[lead.status]}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Clock, label: 'طلب جديد', count: myLeads.filter(l => l.status === 'new').length, color: 'text-yellow-500' },
            { icon: CheckCircle, label: 'تم التواصل', count: myLeads.filter(l => l.status === 'contacted').length, color: 'text-green-500' },
            { icon: BookOpen, label: 'إجمالي الطلبات', count: myLeads.length, color: 'text-[#C0392B]' },
          ].map(({ icon: Icon, label, count, color }) => (
            <div key={label} className="bg-white rounded-2xl p-5 text-center border border-slate-100 shadow-sm">
              <Icon size={24} className={`${color} mx-auto mb-2`} />
              <p className="text-2xl font-black text-slate-900">{count}</p>
              <p className="text-slate-400 text-xs">{label}</p>
            </div>
          ))}
        </div>

        <a href="/" className="block text-center text-[#C0392B] font-semibold text-sm hover:underline">
          ← العودة للرئيسية
        </a>
      </div>
    </div>
  )
}

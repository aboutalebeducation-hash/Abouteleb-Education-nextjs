'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Lead } from '@/types/database'

const ADMIN_EMAIL = 'admin@aboutalebeducation.com'

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-yellow-100 text-yellow-700',
  contacted: 'bg-blue-100 text-blue-700',
  enrolled: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

const STATUS_LABELS: Record<string, string> = {
  new: 'جديد',
  contacted: 'تم التواصل',
  enrolled: 'مسجّل',
  cancelled: 'ملغي',
}

const MAJOR_LABELS: Record<string, string> = {
  medicine: 'الطب البشري',
  dentistry: 'طب الأسنان',
  pharmacy: 'الصيدلة',
  software: 'هندسة البرمجيات',
  ai: 'الذكاء الاصطناعي',
  engineering: 'الهندسة',
  business: 'إدارة الأعمال',
}

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [leads, setLeads] = useState<Lead[]>([])
  const [filter, setFilter] = useState<string>('all')
  const [search, setSearch] = useState('')
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    checkAdmin()
  }, [])

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user || user.email !== ADMIN_EMAIL) {
      router.push('/')
      return
    }
    fetchLeads()
  }

  const fetchLeads = async () => {
    const { data } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
    setLeads(data ?? [])
    setLoading(false)
  }

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id)
    await supabase.from('leads').update({ status } as any).eq('id', id)
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status: status as any } : l))
    setUpdating(null)
  }

  const filtered = leads.filter(l => {
    const matchFilter = filter === 'all' || l.status === filter
    const matchSearch = !search ||
      l.full_name.toLowerCase().includes(search.toLowerCase()) ||
      l.email.toLowerCase().includes(search.toLowerCase()) ||
      l.phone.includes(search)
    return matchFilter && matchSearch
  })

  const counts = {
    all: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    enrolled: leads.filter(l => l.status === 'enrolled').length,
    cancelled: leads.filter(l => l.status === 'cancelled').length,
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-10 h-10 border-4 border-[#C0392B]/20 border-t-[#C0392B] rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 font-cairo" dir="rtl">
      {/* Header */}
      <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-black text-xl">لوحة الأدمن</h1>
          <p className="text-slate-400 text-xs">إدارة طلبات الطلاب</p>
        </div>
        <button
          onClick={() => { supabase.auth.signOut(); router.push('/') }}
          className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-sm font-semibold transition-all"
        >
          تسجيل الخروج
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {Object.entries(counts).map(([key, count]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`p-4 rounded-2xl text-center transition-all border-2
                ${filter === key
                  ? 'border-[#C0392B] bg-white shadow-lg'
                  : 'border-transparent bg-white hover:border-slate-200'}`}
            >
              <p className="text-2xl font-black text-[#C0392B]">{count}</p>
              <p className="text-xs text-slate-500 font-semibold">
                {key === 'all' ? 'الكل' : STATUS_LABELS[key]}
              </p>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl p-4 mb-6 border border-slate-100">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="ابحث بالاسم أو الإيميل أو الهاتف..."
            className="w-full text-sm font-cairo focus:outline-none"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  {['الاسم', 'الإيميل', 'الهاتف', 'التخصص', 'التاريخ', 'الحالة', 'تغيير الحالة'].map(h => (
                    <th key={h} className="px-4 py-3 text-right text-xs font-bold text-slate-500">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-12 text-slate-400">لا توجد طلبات</td>
                  </tr>
                ) : filtered.map(lead => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-800">{lead.full_name}</td>
                    <td className="px-4 py-3 text-slate-600">{lead.email}</td>
                    <td className="px-4 py-3 text-slate-600 dir-ltr">{lead.phone}</td>
                    <td className="px-4 py-3 text-slate-600">{MAJOR_LABELS[lead.major] ?? lead.major}</td>
                    <td className="px-4 py-3 text-slate-500 text-xs">
                      {new Date(lead.created_at).toLocaleDateString('ar-EG')}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${STATUS_COLORS[lead.status]}`}>
                        {STATUS_LABELS[lead.status]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <select
                        value={lead.status}
                        onChange={e => updateStatus(lead.id, e.target.value)}
                        disabled={updating === lead.id}
                        className="text-xs border border-slate-200 rounded-lg px-2 py-1 font-cairo focus:outline-none focus:border-[#C0392B] disabled:opacity-50"
                      >
                        <option value="new">جديد</option>
                        <option value="contacted">تم التواصل</option>
                        <option value="enrolled">مسجّل</option>
                        <option value="cancelled">ملغي</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-center text-slate-400 text-xs mt-6">
          إجمالي الطلبات: {filtered.length} من {leads.length}
        </p>
      </div>
    </div>
  )
}

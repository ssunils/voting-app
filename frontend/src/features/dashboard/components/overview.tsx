import { useGetResults } from '@/hooks/dashboard/use-get-results'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'


export function Overview() {
  const { data, isLoading } = useGetResults();
  if (isLoading) return <div>Loading results...</div>
  return (
    <ResponsiveContainer width='100%' height={480}>
      <BarChart data={data}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey='yes'
          fill='currentColor'
          radius={[4, 4, 0, 0]}
          className='fill-green-300'
        />

        <Bar
          dataKey='no'
          fill='#ff0'
          radius={[4, 4, 0, 0]}
          className='fill-gray-500'
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

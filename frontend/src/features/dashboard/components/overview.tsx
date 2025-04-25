import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

const data = [
  {
    name: '1',
    yes: Math.floor(Math.random() * 500) + 600,
    no: Math.floor(Math.random() * 500) + 600,
  },
  {
    name: '2',
    yes: Math.floor(Math.random() * 500) + 600,
    no: Math.floor(Math.random() * 500) + 600,
  },
  {
    name: '3',
    yes: Math.floor(Math.random() * 500) + 600,
    no: Math.floor(Math.random() * 500) + 600,
  },
  {
    name: '4',
    yes: Math.floor(Math.random() * 500) + 600,
    no: Math.floor(Math.random() * 500) + 600,
  },
  {
    name: '5',
    yes: Math.floor(Math.random() * 500) + 600,
    no: Math.floor(Math.random() * 500) + 600,
  },

  {
    name: '6',
    yes: 0,
    no: 0,
  },

  {
    name: '7',
    yes: 0,
    no: 0,
  },
]

export function Overview() {
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

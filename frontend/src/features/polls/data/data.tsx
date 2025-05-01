import {
  IconArrowDown,
  IconArrowRight,
  IconArrowUp,
  IconCircle,
  IconStopwatch,
} from '@tabler/icons-react'

export const statuses = [
  {
    value: '0',
    label: 'Inactive',
    icon: IconCircle,
  },
  {
    value: '1',
    label: 'Active',
    icon: IconStopwatch,
  }
]

export const priorities = [
  {
    label: 'Low',
    value: 'low',
    icon: IconArrowDown,
  },
  {
    label: 'Medium',
    value: 'medium',
    icon: IconArrowRight,
  },
  {
    label: 'High',
    value: 'high',
    icon: IconArrowUp,
  },
]

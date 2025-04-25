import {
  IconChecklist,
  IconLayoutDashboard,
  IconUsers,
} from '@tabler/icons-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Polls',
          url: '/polls',
          icon: IconChecklist,
        },
      ],
    },
    {
      title: 'Administration',
      items: [
        {
          title: 'Members Management',
          url: '/users',
          icon: IconUsers,
        },
      ],
    }
  ],
}

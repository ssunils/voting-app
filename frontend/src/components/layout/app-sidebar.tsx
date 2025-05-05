import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'
import { NavGroup } from '@/components/layout/nav-group'
import { sidebarData } from './data/sidebar-data'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import { useLogout } from '@/hooks/use-logout'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { mutate: logout } = useLogout()

  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarHeader className='px-4'>
        <strong className='bold'>Poll Manager</strong>
      </SidebarHeader>
      <SidebarContent>
        {sidebarData.navGroups.map((props) => (
          <NavGroup key={props.title} {...props} />
        ))}
      </SidebarContent>
      <SidebarFooter>

        <Button variant={'secondary'} onClick={() => logout()}>Logout <LogOut /></Button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

//
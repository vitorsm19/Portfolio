export interface NavItem {
  id: string
  label: string
  iconName: 'info' | 'code' | 'document' | 'message'
}

export const navigationItems: NavItem[] = [
  { id: 'about', label: 'About Me', iconName: 'info' },
  { id: 'skills', label: 'Skills', iconName: 'code' },
  { id: 'projects', label: 'Projects', iconName: 'document' },
  { id: 'services', label: 'Services', iconName: 'document' },
  { id: 'contact', label: 'Contact', iconName: 'message' },
]

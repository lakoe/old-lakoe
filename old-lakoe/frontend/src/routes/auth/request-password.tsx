import { RequestPass } from '@/pages/password/request'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/request-password')({
  component: () => <div><RequestPass/></div>
})
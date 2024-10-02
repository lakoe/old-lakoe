import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/test1/child')({
  component: () => <div>Hello /test1/child!</div>
})
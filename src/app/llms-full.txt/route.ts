import { buildLlms } from '@/lib/llms'

export const dynamic = 'force-static'

export function GET() {
  return new Response(buildLlms(true), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}

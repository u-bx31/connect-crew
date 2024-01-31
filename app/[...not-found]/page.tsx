
import { notFound } from "next/navigation"

export const metadata = {
  title: '404 Page not Found',
}

export default function NotFoundCatchAll() {
  notFound()
  return null
}

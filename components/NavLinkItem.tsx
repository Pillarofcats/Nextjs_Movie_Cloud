//Interface
import iNavLinkItem from "@/interface/navlinkitem"
//Nextjs
import Link from 'next/link'

export default function NavLinkItem({ label }:iNavLinkItem) {

  return (
    <div className="flex-1 self-center text-white cursor-pointer hover:underline transition">
      <Link href={ label === 'Home' ? '/' : `/${label.toLowerCase()}` }>{ label }</Link>
    </div>
  )
}
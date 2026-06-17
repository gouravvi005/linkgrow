import { Icon } from "@iconify/react";
import Link from "next/link";

export function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-brand rounded-xl p-2 transition-transform group-hover:rotate-12 shadow-lg shadow-brand/20">
                <Icon icon="lucide:sparkles" className="h-7 w-7 text-white" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-foreground uppercase">
                LINKGROW<span className="text-brand">.</span>
            </span>
        </Link>
    )
}
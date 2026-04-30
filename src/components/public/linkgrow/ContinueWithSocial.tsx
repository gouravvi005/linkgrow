import { Icon } from "@iconify/react";
import { Button } from "../ui/button";


export default function ContinueWithSocial() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <button className="h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center gap-3 font-black text-xs text-slate-600 hover:bg-white hover:border-brand/20 transition-all group uppercase tracking-widest">
                <Icon icon="simple-icons:google" className="h-4 w-4 text-slate-400 group-hover:text-brand" />
                Google
            </button>
            <button className="h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center gap-3 font-black text-xs text-slate-600 hover:bg-white hover:border-brand/20 transition-all group uppercase tracking-widest">
                <Icon icon="simple-icons:apple" className="h-4 w-4 text-slate-400 group-hover:text-black" />
                Apple
            </button>
        </div>
    )
}
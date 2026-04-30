import Image from 'next/image'

type TestimonialCardProps = {
  name: string
  role: string
  quote: string
  image: string
}

export function TestimonialCard({ name, role, quote, image }: TestimonialCardProps) {
  return (
    <article className="rounded-3xl bg-white p-5 text-[#0A3D2A]">
      <div className="flex items-center gap-3">
        {/* <Image src={image} alt={name} width={52} height={52} className="h-12 w-12 rounded-full object-cover" /> */}
        <div>
          <h3 className="font-bold">{name}</h3>
          <p className="text-xs text-[#486356]">{role}</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-6 text-[#2f493d]">&quot;{quote}&quot;</p>
    </article>
  )
}

import Container from '@/components/shared/Container'
import AdaptiveCard from '@/components/shared/AdaptiveCard'
import DoubleSidedImage from '@/components/shared/DoubleSidedImage'
import { Sparkles, Calendar, ArrowUpRight, CheckCircle2 } from 'lucide-react'

// Helper to format the path segments into a clean title
function formatSlug(slug: string[]): string {
    if (!slug || slug.length === 0) return 'Creator Studio'
    const lastSegment = slug[slug.length - 1]
    return lastSegment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase())
}

export default async function CreatorCatchAllPage({
    params,
}: {
    params: Promise<{ slug: string[] }>
}) {
    const slugParams = await params
    const title = formatSlug(slugParams.slug)
    const moduleName = slugParams.slug[0]?.toUpperCase() || 'CREATOR'

    return (
        <Container>
            <div className="flex flex-col gap-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <span className="text-xs font-bold tracking-wider text-primary uppercase">
                            {moduleName} Module
                        </span>
                        <h2 className="font-bold text-gray-900 dark:text-gray-100 mt-1">
                            {title}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">
                            Build, grow, and optimize your creator brand with LinkGroww.
                        </p>
                    </div>
                    <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-200 dark:border-emerald-500/20">
                        <CheckCircle2 size={14} />
                        Active Feature Sandbox
                    </div>
                </div>

                {/* Dashboard Grid Mockup */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <AdaptiveCard className="md:col-span-2">
                        <div className="p-2">
                            <h5 className="font-bold mb-4 flex items-center gap-2">
                                <Sparkles className="text-yellow-500" size={18} />
                                Feature Preview
                            </h5>
                            <div className="border border-dashed border-gray-200 dark:border-gray-800 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50/50 dark:bg-gray-900/20 min-h-[300px]">
                                <DoubleSidedImage
                                    className="max-w-[200px]"
                                    src="/img/others/img-2.png"
                                    darkModeSrc="/img/others/img-2-dark.png"
                                    alt="Creator Feature"
                                />
                                <h6 className="font-bold mt-4">
                                    {title} Interface
                                </h6>
                                <p className="text-xs text-gray-500 max-w-sm mt-2">
                                    This workspace module is pre-integrated into LinkGroww's creator router. Configure your themes, automation rules, and links directly.
                                </p>
                            </div>
                        </div>
                    </AdaptiveCard>

                    <div className="flex flex-col gap-6">
                        <AdaptiveCard>
                            <h5 className="font-bold mb-3 flex items-center gap-2">
                                <Calendar size={18} className="text-primary" />
                                Insights
                            </h5>
                            <div className="flex flex-col gap-4">
                                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                                    <div className="text-xs text-gray-500">Estimated Reach Impact</div>
                                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1.5 mt-0.5">
                                        +24.8%
                                        <span className="text-xs text-emerald-500 flex items-center font-normal">
                                            <ArrowUpRight size={14} /> up
                                        </span>
                                    </div>
                                </div>
                                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                                    <div className="text-xs text-gray-500">Integration Status</div>
                                    <div className="text-sm font-bold text-gray-900 dark:text-gray-100 mt-0.5">
                                        Ready to configure
                                    </div>
                                </div>
                            </div>
                        </AdaptiveCard>

                        <AdaptiveCard>
                            <h5 className="font-bold mb-3">Quick Setup Guide</h5>
                            <ul className="text-xs space-y-3 font-semibold text-gray-500 dark:text-gray-400">
                                <li className="flex items-center gap-2">
                                    <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">1</span>
                                    Connect your social accounts.
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">2</span>
                                    Add your premium link templates.
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="h-5 w-5 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[10px]">3</span>
                                    Publish change live.
                                </li>
                            </ul>
                        </AdaptiveCard>
                    </div>
                </div>
            </div>
        </Container>
    )
}

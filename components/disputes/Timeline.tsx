"use client"

import { cn } from "@/lib/utils"

interface TimelineItem {
    type: string
    date: string
    label: string
    roundNumber?: number
    status?: string
    content?: string
}

export function Timeline({ items }: { items: TimelineItem[] }) {
    return (
        <div className="space-y-6 relative">
            <div className="absolute left-[5.5px] top-2 bottom-2 w-px bg-border -z-10" />
            {items.map((item, i) => (
                <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center mt-1">
                        <div
                            className={cn(
                                "w-3 h-3 rounded-full border-2 border-background ring-2 ring-border",
                                item.type === "dispute_created" && "bg-primary ring-primary/20",
                                item.type === "round" && "bg-blue-500 ring-blue-500/20",
                                item.type === "letter" && "bg-green-500 ring-green-500/20"
                            )}
                        />
                    </div>

                    <div className="flex-1 bg-card border border-border rounded-lg p-4 shadow-sm">
                        <div className="flex justify-between items-start mb-1">
                            <div className="font-medium text-foreground">{item.label}</div>
                            <div className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                {new Date(item.date).toLocaleString()}
                            </div>
                        </div>

                        {item.type === "round" && (
                            <div className="text-sm mt-2 flex items-center gap-2">
                                <span className="text-muted-foreground">Status:</span>
                                <span className={cn(
                                    "px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                                )}>
                                    {item.status}
                                </span>
                            </div>
                        )}

                        {item.type === "letter" && (
                            <div className="mt-3 bg-muted/50 p-3 rounded-md border border-border/50">
                                <pre className="text-xs whitespace-pre-wrap font-mono text-muted-foreground overflow-x-auto">
                                    {item.content}
                                </pre>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}

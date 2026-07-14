export default function Heading({
    title,
    description,
    variant = 'default',
    children,
}: {
    title: string;
    description?: string;
    variant?: 'default' | 'small' | 'hero';
    children?: React.ReactNode;
}) {
    if (variant === 'hero') {
        return (
            <header className="mb-8 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
                <div className="space-y-1">
                    <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-sm text-muted-foreground">{description}</p>
                    )}
                </div>
                {children && <div className="flex items-center gap-2">{children}</div>}
            </header>
        );
    }

    if (variant === 'small') {
        return (
            <header className="">
                <h2 className="mb-0.5 text-base font-semibold text-foreground">
                    {title}
                </h2>
                {description && (
                    <p className="text-sm text-muted-foreground">{description}</p>
                )}
            </header>
        );
    }

    return (
        <header className="mb-8 space-y-0.5">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
                {title}
            </h2>
            {description && (
                <p className="text-sm text-muted-foreground">{description}</p>
            )}
        </header>
    );
}

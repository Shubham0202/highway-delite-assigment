import DetailsContent from '@/components/DetailsContent'

export default async function DetailsPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    return <DetailsContent id={id} />
}

// Generate static params if needed (optional)
export async function generateStaticParams() {
    return [
        { id: '1' },
        { id: '2' },
    ]
}
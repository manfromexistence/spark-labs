'use client' // Error components must be Client Components

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className='flex-center min-h-screen w-full flex flex-col gap-3'>
            <h2>Check your if your browser can run this project?</h2>
            <Button
                onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => window.location.reload()
                }
            >
                Check
            </Button>
        </div>
    )
}

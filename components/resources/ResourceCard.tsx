import PDFCard    from './PDFCard'
import VideoCard  from './VideoCard'
import LinkCard   from './LinkCard'
import type { Resource } from '@/types/course'

interface ResourceCardProps {
  resource: Resource
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  switch (resource.type) {
    case 'pdf':   return <PDFCard   resource={resource} />
    case 'video': return <VideoCard resource={resource} />
    default:      return <LinkCard  resource={resource} />
  }
}

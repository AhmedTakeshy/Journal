import PostDetails from '@/components/PostDetails'

type Props = {}

export default function page({}: Props) {
  return (
      <div className="grid grid-cols-1 gap-3 m-4 md:grid-cols-2 lg:grid-cols-3">
          <PostDetails />
      </div>
  )
}
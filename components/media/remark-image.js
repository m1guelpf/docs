import { Image } from '~/components/media'
import RemarkCaption from '~/components/text/remark-caption'
import components from '~/lib/remark-components'

const RemarkImage = ({
  caption,
  href,
  target,
  components: customComponents,
  ...props
}) => {
  return (
    <>
      {href ? (
        <a href={href} target={target} rel="noopener">
          <Image {...props} shadow={true} />
        </a>
      ) : (
        <Image {...props} shadow={true} />
      )}
      <RemarkCaption
        components={{
          ...components,
          ...customComponents
        }}
      >
        {caption}
      </RemarkCaption>

      <style jsx>{``}</style>
    </>
  )
}

export default RemarkImage

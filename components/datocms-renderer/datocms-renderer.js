import { RemarkImage } from '~/components/media'
import RemarkRenderer from '~/components/remark-renderer'
import components from '~/lib/remark-components'
import { GitImports } from '~/components/quickstarts'

const ContentSection = ({ className, children }) => (
  <section className={className}>{children}</section>
)

const DatoCMSRenderer = ({ content, components: customComponents }) => (
  <article>
    {content.map((block, index) => {
      return block._modelApiKey === 'markdown' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          <RemarkRenderer
            components={{
              ...components,
              ...customComponents
            }}
            contentType={block.contentType}
          >
            {block.content}
          </RemarkRenderer>
        </ContentSection>
      ) : block._modelApiKey === 'image' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          <RemarkImage
            href={block.imageAnchor}
            target={block.openAnchorInNewWindow === true ? '_blank' : undefined}
            src={block.image.url}
            width={block.image.width}
            height={block.image.height}
            title={block.image.title}
            alt={block.image.alt}
            caption={block.caption}
          />
        </ContentSection>
      ) : block._modelApiKey === 'image_external' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          <RemarkImage
            href={block.imageAnchor}
            target={block.openAnchorInNewWindow === true ? '_blank' : undefined}
            src={block.imageUrl}
            width={block.imageWidth}
            height={block.imageHeight}
            title={block.imageTitle}
            alt={block.imageAlt}
            caption={block.caption}
          />
        </ContentSection>
      ) : block._modelApiKey === 'code' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          <RemarkRenderer
            components={{
              ...components,
              ...customComponents
            }}
            contentType="code"
            caption={block.caption}
            allowCopy={block.allowCopy}
          >
            {block.content}
          </RemarkRenderer>
        </ContentSection>
      ) : block._modelApiKey === 'git_import' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          <GitImports
            repoUrl={block.repoUrl}
            hideGitHub={!block.showGithub}
            hideGitLab={!block.showGitlab}
            hideBitbucket={!block.showBitbucket}
          />
        </ContentSection>
      ) : block._modelApiKey === 'vercel_deploy_button' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          <div style={{ marginLeft: '2rem', fontSize: '0.9rem' }}>
            unsupported block type:{' '}
            <pre style={{ display: 'inline', backgroundColor: '#FFFF00' }}>
              {block._modelApiKey}
            </pre>
          </div>
        </ContentSection>
      ) : block._modelApiKey === 'video' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          <div style={{ marginLeft: '2rem', fontSize: '0.9rem' }}>
            unsupported block type:{' '}
            <pre style={{ display: 'inline', backgroundColor: '#FFFF00' }}>
              {block._modelApiKey}
            </pre>
          </div>
        </ContentSection>
      ) : block._modelApiKey === 'video_external' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          <div style={{ marginLeft: '2rem', fontSize: '0.9rem' }}>
            unsupported block type:{' '}
            <pre style={{ display: 'inline', backgroundColor: '#FFFF00' }}>
              {block._modelApiKey}
            </pre>
          </div>
        </ContentSection>
      ) : block._modelApiKey === 'html' ? (
        <ContentSection className={`${block._modelApiKey}`} key={index}>
          <div style={{ marginLeft: '2rem', fontSize: '0.9rem' }}>
            unsupported block type:{' '}
            <pre style={{ display: 'inline', backgroundColor: '#FFFF00' }}>
              {block._modelApiKey}
            </pre>
          </div>
        </ContentSection>
      ) : (
        undefined
      )
    })}
    <style jsx>{`
      article :global(p > img) {
        display: block;
        margin: 40px auto;
        text-align: center;
      }
    `}</style>
  </article>
)

export default DatoCMSRenderer

import Wrapper from './wrapper'

const Main = ({ children }) => (
  <main className="main">
    <Wrapper>{children}</Wrapper>
    <style jsx>{`
      .main {
        min-height: 100vh;
        padding-top: 80px;
      }

      .main :global(> div) {
        display: flex;
        min-height: calc(100vh - 84px);
      }
    `}</style>
  </main>
)

export default Main

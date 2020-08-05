export default function handleImport(
  importPromise: Promise<any>
): Promise<any> {
  return importPromise.catch(async err => {
    // if this is an old deployment we might fail to load the chunk
    if (err.name === 'ChunkLoadError') {
      let newDeployment = false

      // check if there is a new buildId
      try {
        const buildIdRes = await fetch('/')
        const html = await buildIdRes.text()
        newDeployment = html.indexOf((self as any).__NEXT_DATA__.buildId) === -1
      } catch (buildIdErr) {
        // we failed to check the buildId, in this case we will rethrow
        // original error
      }

      if (newDeployment) {
        // if a new deployment occurred reload the page (only reload for new
        // deployment to prevent infinite reloading from a real ChunkLoadError)
        document.location.reload()
      } else {
        // if no new deploy occurred rethrow
        throw err
      }
    } else {
      throw err
    }
  })
}

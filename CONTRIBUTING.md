# Contributing to the Vercel Documentation

Thank you for your interest in contributing to the Vercel Docs!

The following describes how to contribute to the Vercel documentation, API reference, guides and code examples.

## What Does this Document Contain?

This document contains all the required information and links to resources needed to contribute to the Vercel documentation:

- [Code of Conduct](#code-of-conduct) - our Code of Conduct, adapted from the [Contributor Covenant](http://contributor-covenant.org)
- [Reporting an Issue](#reporting-issues) - guidance on how to raise an issue or provide feedback on the Vercel documentation
- [Contributing Content](#contributing-content) - a collection of all information required for contributing
  - [Forking Workflow](#forking-workflow) - a guide on how to keep your fork in sync with `master`
  - [Platform and Usage Documentation](#platform-and-usage-documentation) - information on contributing to `pages/docs`
  - [Guides](#guides) - information on contributing to `pages/guides`
  - [API Reference](#api-reference) - information on contributing to `pages/docs/api`
  - [Examples](#examples) - information on contributing to the [examples](https://github.com/vercel/vercel/tree/master/examples) repository
  - [Using Components](#using-components) - how to make the most out of pre-built component library
  - [Static Assets](#static-assets) - where to put static assets and how the naming convention works

## Code of Conduct

We provide a Code of Conduct to make clear the behavior we expect from contributors and maintainers alike. We are committed to providing a welcoming and supportive environment and kindly request that you participate in these values also.

Our Code of Conduct is adapted from the [Contributor Covenant](http://contributor-covenant.org), version 1.4,
available at [http://contributor-covenant.org/version/1/4](http://contributor-covenant.org/version/1/4/).

## Reporting Issues

If you have found a bug, spelling mistake, missing information, or anything related to the Vercel documentation that you feel is an issue that should be reported, please create a new issue here on GitHub. For issues relating to examples, please [create an issue on the Vercel repository](https://github.com/vercel/vercel/issues/new).

An issue can be raised by clicking the 'Issues' tab at the top of the repository, followed by the Green 'New issue' button. To make this process as easy as possible we have created a few basic templates to choose from, there are, however, often cases that will fall outside of the templates provided.

If your issue doesn't fit with any of the templates then that's okay, please submit it as a 'Documentation Issue or Request'. When submitting an issue, please thoroughly and concisely describe the problem you are experiencing so that we may easily understand and resolve the issue in a timely manner.

## Contributing Content

There are multiple sections of the Vercel Docs, including: the main [Vercel platform and usage documentation](https://vercel.com/docs), [guides](https://vercel.com/guides), [Vercel API reference](https://vercel.com/docs/api), and [examples](https://vercel.com/examples).

When contributing content to any of the previously mentioned sections, please fork this repository and then edit the content for the section that you want to contribute to, if you are not sure how to do this then please take a look at the [Forking Workflow](#forking-workflow) below.

Please avoid submitting large pull requests containing contributions for multiple sections if the content is not interrelated, it is better to submit multiple smaller pull requests in this situation.

When adding new files the repository, we encourage you to make use of existing content, often the quickest way to get started is to copy the structure of an existing file and remove most of the content. This should give you a strong scaffold to build your content on top of and help to ensure consistency in styling amongst different pages.

You can run the documentation site locally by cloning this repository, installing the dependencies with `yarn`, and finally running the development server with `yarn dev`.

## Forking Workflow

To contribute to this repository, you will need to fork it, make changes and submit a pull request. This section is a brief guide on how to do this whilst making sure your forked repository stays up to date the with the official one.

The first step is to fork the repository, creating a copy of it under your own account. To do this, click the 'fork' button at the top right of the page.

A few seconds later you should be redirected. Now, if you look at the top left of the page it should show your GitHub username before the repository, confirming the fork has been successful.

Next you need to clone your fork your local environment so you can make changes to it. To do this you can click the Green 'Clone or download' button which will give you a URL to copy. Once copied, enter `git clone` in your terminal followed by the URL and hit enter, the command should look like this:

`git clone git@github.com:<your username here>/docs.git`

If successful, you should see the forked repository being cloned to your local environment.

Once you've cloned the forked repository to your local environment, it's a good idea to install the project dependencies. We use [Yarn](https://yarnpkg.com/en/) as our package manager, if you do not have it installed currently, their documentation provides a set of [instructions](https://yarnpkg.com/en/docs/install#mac-stable).

To install the project dependencies, simply enter:

`yarn`

With the dependencies installed, you should now add a remote path to the official repository. This will allow you to pull the most recent changes from the official repository into your local fork at any time, ensuring things are kept up to date and in sync.

To add the remote path for the official git repository, enter the following:

`git remote add upstream git@github.com:vercel/docs.git`

This command adds a new remote branch, with the name 'upstream'. If you ever want to pull the recent changes to update your local fork you can use the following command:

`git pull upstream master`

So far you've managed to fork, clone, install dependencies and add a remote, not bad going! Now you want to start making our changes, to do this you should create a new branch. Creating a branch for each change you make will keep things simpler for everyone and allow you to work on multiple changes at once if you like.

You can create a branch by using:

`git checkout -b <your branch name>`

Remember to use a descriptive and meaningful name when creating your branch, this will help you remember what its purpose is!

Now you're working on a branch you are a free to make the changes needed, further help with this can be found [below](#platform-and-usage-documentation). After you've finished making changes, commit them and push them to your new branch, you will need to create a new upstream remote to do this.

To create a new upstream remote, enter:

`git push --set-upstream origin <your branch name>`

Your new branch should now appear on your remote repository. It can be viewed by visiting your remote repository and clicking 'Branches'. On this page you will see multiple sections, the most important one being 'Your branches'.

To the right of the branch you will see a button that says 'New pull request', click this to begin the process of submitting your changes for review. You will now be prompted to enter a relevant title and a description of the changes made. When entering this information try to be concise but make sure to include the following information:

- What changes you've made
- Your reason for making them
- A request for feedback if required (add [WIP] to your title)

Congratulations, you've just made your first pull request to the Vercel Documentation!

The rest of this section relates to other scenarios you may encounter whilst contributing and may not be applicable just yet, so feel free to [read ahead](#platform-and-usage-documentation). If you want to know what you should do in the event changes are requested to your pull request, or your master branch becomes out of sync with the official repository, read on below:

### Master Branch out of Sync

This is a very common situation and happens when changes are made to the official repository, meaning your fork is suddenly out of date. The only time you need to consider this is before you create a new branch, this means that whenever you start working on changes, your branch will always be up to date as of that moment.

When pulling changes from the official repository, it is always a good idea to do so from your master branch. Providing you've followed the advice above about adding a remote upstream, your command should look like this:

`git pull upstream master`

This will get the most recent changes and bring your local fork up to date, at this point it is a good idea to have your remote fork reflect this, all this requires is to use:

`git push`

Now, both your local and remote fork are up to date with the official repository, you are ready to create branches and make changes!

### Pull Request Changes Requested

When you submit a pull request, a reviewer may request that you make further changes before merging with the master branch. This situation might seem difficult at first but is extremely straightforward.

All you need to do is make the changes on the same branch locally, commit and push them. Because you already have a pull request set up to track that branch, GitHub will automatically update it with your most recent changes. At this point it's a good idea to tag the original reviewer in the pull request using `@<reviewers username>`, to let them know you've made the requested changes.

## Platform and Usage Documentation

The content for this section can be found in the `pages/docs` directory.

Each `.mdx` file within the docs directory, aside from the API files, is an independent page. You can edit existing files or create a new file under the section the content belongs to.

As suggested by the `.mdx` extension, the Vercel documentation uses [MDX](https://mdxjs.com), a markdown parser mixed with JSX. This allows us to use React components within markdown to nicely render our content.

An example of a docs MDX file:

```jsx
import Doc from '~/components/layout/docs'

import Snippet from '~/components/snippet'

export const meta = {
  title: 'The Title for the New Doc',
  description: 'The description for the new documentation page.',
  date: '1 January 2019'
}

This is the content written in Markdown with MDX!

<TerminalInput># this is how we show the terminal input</TerminalInput>

The following is to allow the content to be exported as a page with our layout.

export default ({ children }) => <Doc meta={meta}>{children}</Doc>
```

When adding a new page to the v2 docs, make sure to add it to the appropriate section with a URL to the object located in the `lib/data/v2/docs.js` file.

## Guides

The content for this section can be found in the `pages/guides` directory.
Just like [Platform and Usage Docs](#platform-and-usage-documentation), our Guides use the same MDX system to generate top-level pages.

A guide can be written on many topics and will commonly focus on the creation and deployment of a project using Vercel. We strongly encourage you to take a look at the existing guides, these illustrate the right level of detail required for each step, from initial creation through to deployment.

Guides are not limited to project creation and deployment however. The Vercel platform is incredibly powerful and feature-rich, as a result there are many topics you could contribute to, our advice would be to take a feature you enjoy and use that as a starting point for your guide.

An example of a guides MDX file:

```js
import Guide from '~/components/layout/guide'
import Snippet from '~/components/snippet'

export const meta = {
  title: 'The Title for the New Guide',
  description: 'The description for the new guide page.',
  published: '1 January 2019',
  authors: ['your-vercel-username'],
  url: '/guides/guide-url'
}

This is the content written in Markdown with MDX!.

<Snippet dark text="# this is how we show the terminal input" />

The following is to allow the content to be exported as a page with our layout.

export default ({ children }) => <Guide meta={meta}>{children}</Guide>
```

The meta object described above is not optional since the information is used to list the guide.

When adding a new guide, make sure to import and export the meta of the guide in the `lib/data/guides.json` file. This enables the guide to be listed on the guides front-page.

## API Reference

The content for this section can be found in the `pages/docs/api` directory. It uses the same versioning structure as `pages/docs`.

We are currently focused on expanding the documentation for the Vercel platform 2.0 API reference which can be found in `pages/docs/api/v2`.

As with the [Platform and Usage Docs](#platform-and-usage-documentation), the API uses MDX, although each file is not an independent page but instead is compiled into a single page, listing the file in the `lib/data/v2/api.js` file.

An example API Reference MDX file: https://github.com/vercel/docs/blob/master/pages/docs/api/v2/api-docs-mdx/api-basics/rate-limits.mdx

## Examples

The content for the examples section is not contained within this repository. To contribute an example, please visit the [Vercel Examples](https://github.com/vercel/vercel/tree/master/examples#readme) repository where you will find all the relevant information to do so.

## Using Components

To make the creation of documentation and guides as simple as possible, we have developed a [component library](https://github.com/vercel/docs/tree/master/components). This library allows us to keep the format and appearance of our documentation and guides consistent, making creating new content a breeze!

You can find multiple examples in each page of how to import and use these components, below is an example import statement:

`import Link from '~/components/text/link'`

We believe that these components should be enough to cover usage in nearly all situations, however, if you feel that a new component should be added then please do so in a separate pull request, stating clearly your reasons for adding it.

## Static Assets

A picture is worth a thousand words. Using graphics such as images in guides and documentation can really help the reader understand new concepts, if you'd like to include images, or any other static asset, you should follow this advice.

All static assets should be filed under `public/static` along with their type, docs or guide, and if specific to a particular page, the name of that page. For example, `public/static/guides/deploying-angular-with-vercel` would be the place to store static assets for a guide on deploying Angular with Vercel.

By following this convention, you will be helping us keep this repository organized and easy to find things within, making life easier for everyone.

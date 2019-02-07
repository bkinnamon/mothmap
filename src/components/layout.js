import React from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import PageTransitions from 'gatsby-plugin-page-transitions'
import SEO from './SEO'
import styles from './layout.module.css'

const duration = 100
const defaultStyle = {
  transition: `opacity ${duration}ms ease`,
  opacity: 0,
  height: '100%'
}
const transitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 1 },
  exited: { opacity: 0 }
}

export default ({ data, children }) => (
  <StaticQuery
    query={query}
    render={data => (
      <div className={styles.page}>
        <SEO />
        <header>
          <div className={styles.brand}>
            <a href="https://extension.umd.edu/">
              <h1>University of Maryland Extension</h1>
            </a>
          </div>
          <div className={styles.pageTitle}>
            <h1>{data.site.siteMetadata.title}</h1>
          </div>
          <nav>
            <Link to="/">Map</Link>
            <Link to="/spray-rate/">Spray Rate</Link>
            <a href="https://extension.umd.edu/hgic/corn-earworm-vegetables">
              Corn Earworm
            </a>
          </nav>
        </header>
        <main>
          <PageTransitions
            defaultStyle={defaultStyle}
            transitionStyles={transitionStyles}
            transitionTime={duration}
          >
            {children}
          </PageTransitions>
        </main>
      </div>
    )}
  />
)

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

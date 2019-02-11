import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import AniLink from 'gatsby-plugin-transition-link/AniLink'
import SEO from './SEO'
import styles from './layout.module.css'

export default ({ data, children }) => (
  <StaticQuery
    query={query}
    render={data => (
      <div className={styles.page}>
        <SEO />
        <header>
          <div className={styles.brand}>
            <a href="https://extension.umd.edu/">
              <h2>University of Maryland Extension</h2>
            </a>
          </div>
          <div className={styles.pageTitle}>
            <h1>{data.site.siteMetadata.title}</h1>
          </div>
          <nav>
            <AniLink fade to="/">
              Map
            </AniLink>
            <AniLink fade to="/spray-rate/">
              Spray Rate
            </AniLink>
            <a href="https://extension.umd.edu/hgic/corn-earworm-vegetables">
              Corn Earworm
            </a>
          </nav>
        </header>
        <main>{children}</main>
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

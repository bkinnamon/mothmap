module.exports = {
  siteMetadata: {
    title: 'Moth Map',
    titleTemplate: '%s',
    description: 'A map of Corn Earworm sighting data.',
    url: 'https://www.mdmothmap.com',
    image:
      'https://extension.umd.edu/sites/all/themes/agnrthemes/agnr/images/header/extension-banner.png',
    twitterUsername: '@mdmothmap'
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography'
      }
    },
    'gatsby-plugin-react-leaflet',
    'gatsby-plugin-transition-link',
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-119625496-1',
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Moth Map',
        short_name: 'Moth Map',
        start_url: '/',
        background_color: '#dddddd',
        theme_color: '#e21833',
        display: 'standalone',
        icon: 'static/icon.png'
      }
    },
    'gatsby-plugin-offline'
  ]
}

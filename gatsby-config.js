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
    'gatsby-plugin-page-transitions'
  ]
}

import React, { Component } from 'react'
import Firebase from 'firebase/app'
import 'firebase/firestore'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import Leaflet from 'leaflet'

const projectId = 'moth-map'
const senderId = '795327380062'

const fbConfig = {
  apiKey: 'AIzaSyCCyQTJ-bBo8s-TsSNFNHXGUIq7HaxBCn0',
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId: projectId,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId: senderId
}

Firebase.initializeApp(fbConfig)

const db = Firebase.firestore()

export default class MothMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sites: [],
      mapAttributes: {}
    }
  }

  componentDidMount() {
    let sites = []
    let mapAttributes = {}

    db.collection('Sites')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          sites.push({
            id: doc.id,
            ...doc.data()
          })
        })
      })
      .then(() => {
        if (sites.length > 1) {
          mapAttributes.bounds = Leaflet.latLngBounds(
            sites.map(site => [site.Position.latitude, site.Position.longitude])
          )
        } else if (sites.length === 1) {
          mapAttributes.center = [
            sites[0].Position.latitude,
            sites[0].Position.longitude
          ]
          mapAttributes.zoom = 13
        }

        this.setState({ sites, mapAttributes })
      })
  }

  render() {
    const { sites, mapAttributes } = this.state

    if (typeof window !== undefined && sites.length > 0) {
      console.log(sites)
      return (
        <Map style={{ height: '100%' }} {...mapAttributes}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {sites.map(site => (
            <Marker
              key={site.id}
              position={[site.Position.latitude, site.Position.longitude]}
            >
              <Popup>{site.Name}</Popup>
            </Marker>
          ))}
        </Map>
      )
    } else {
      return <p>Loading...</p>
    }
  }
}

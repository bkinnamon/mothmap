import React, { Component } from 'react'
import Firebase from 'firebase/app'
import 'firebase/firestore'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

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
        // Setup the map attributes (center and zoom or the bounds)
        if (sites.length > 1) {
          let min = [sites[0].Position.latitude, sites[0].Position.longitude]
          let max = [sites[0].Position.latitude, sites[0].Position.longitude]
          sites.forEach(site => {
            min[0] = Math.min(site.Position.latitude, min[0])
            min[1] = Math.min(site.Position.longitude, min[1])
            max[0] = Math.max(site.Position.latitude, max[0])
            max[1] = Math.max(site.Position.longitude, max[1])
          })
          mapAttributes.bounds = [min, max]
        } else if (sites.length === 1) {
          mapAttributes.center = [
            sites[0].Position.latitude,
            sites[0].Position.longitude
          ]
          mapAttributes.zoom = 13
        }
      })
      .then(() => {
        // Create the popups' contents
        sites.forEach(site => {
          const fiveDayAvg = this.calcFiveDayAvg(site)
          const fiveDayStr = fiveDayAvg !== -1 ? fiveDayAvg : 'no data found'
          site.popup = (
            <div>
              <h3>{site.Name}</h3>
              <p>
                <strong>5-day Average:</strong> {fiveDayStr}
              </p>
            </div>
          )
        })

        this.setState({ sites, mapAttributes })
      })
  }

  render() {
    const { sites, mapAttributes } = this.state
    if (typeof window !== undefined && sites.length > 0) {
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
              <Popup>{site.popup}</Popup>
            </Marker>
          ))}
        </Map>
      )
    }
    return <p>Loading...</p>
  }

  calcFiveDayAvg(site) {
    if (site.Entries.length === 0) {
      return -1
    }

    // Copy and sort the entries by date (newest first)
    const entries = site.Entries.map(e => ({
      count: e.Count,
      date: e.Date.toDate()
    }))
    entries.sort((e1, e2) => e2.date - e1.date)

    // Get the count for at least five days if possible
    const start = entries[0].date
    let count = entries[0].count
    let end
    entries.slice(1).some(entry => {
      count += entry.count
      end = entry.date
      return this.daysDiff(end, start) >= 5
    })

    // Calculate the average over the last five days
    return (count / this.daysDiff(end, start)) * 5
  }

  daysDiff(date1, date2) {
    const MILLIS_IN_DAY = 86400000
    const diff = date1 - date2
    return Math.abs(Math.ceil(diff / MILLIS_IN_DAY))
  }
}

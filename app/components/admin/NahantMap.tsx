import React, { useEffect, useRef } from 'react'
import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { fromLonLat } from 'ol/proj'
import { Feature } from 'ol'
import { Point } from 'ol/geom'
import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import { Fill, Stroke, Style } from 'ol/style'
import CircleStyle from 'ol/style/Circle'

const NahantMap = ({ latitude, longitude }: { latitude: number; longitude: number }) => {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current) return
    // Initialize the map centered at the listing's coordinates
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM({
            attributions: [] // Removes OpenStreetMap attribution
          })
        })
      ],
      view: new View({
        center: fromLonLat([longitude, latitude]),
        zoom: 12 // Adjust the zoom level as needed
      })
    })

    // Create a marker for the single listing
    const marker = new Feature({
      geometry: new Point(fromLonLat([longitude, latitude]))
    })

    marker.setStyle(
      new Style({
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({ color: '#00FFFF' }),
          stroke: new Stroke({
            color: 'white',
            width: 2
          })
        })
      })
    )
    // Create a vector source and add the marker
    const vectorSource = new VectorSource({
      features: [marker]
    })

    // Create a vector layer to display the marker
    const vectorLayer = new VectorLayer({
      source: vectorSource
    })

    // Add the vector layer to the map
    map.addLayer(vectorLayer)

    // Clean up when component unmounts
    return () => map.setTarget(undefined)
  }, [latitude, longitude])

  return <div ref={mapRef} className="absolute top-0 left-0 w-full h-full" />
}

export default NahantMap

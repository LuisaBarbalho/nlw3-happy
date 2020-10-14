import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage{
    id: number,
    latitude: number,
    longitude: number,
    name: string
}

function OrphanagesMap() {

    // State - Alterada pelo próprio componente
    // setNomeDoState -> função para atualizar a lista

    //<Orphanage[]> -> um array de formato Orphanage
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);

    console.log(orphanages);
    // Carregar da api do back assim que o componente é carregado
    // primeiro parametro: QUAL ação deve ser executada
    // segundo parametro: QUANDO as informações dentro do array tiverem seus valores alterados

    //se usar axios.get -> vai chamar na api toda vez que for renderizado o componente - MUITAS chamadas -> melhor usar user Effect
    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        })
    }, []);

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy" />

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando sua visita :)</p>
                </header>

                <footer>
                    <strong>Natal</strong>
                    <span>Rio Grande do Norte</span>
                </footer>
            </aside>

            <Map 
                center={[-5.8105031,-35.2442199]}
                zoom={13}
                style={{ width: '100%', height: '100%'}}
            >
                {/*<TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {orphanages.map(orphanage => {
                    return(
                        <Marker
                            icon = {mapIcon}
                            position={[orphanage.latitude,orphanage.longitude]}
                            key={orphanage.id}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF" />
                                </Link>
                            </Popup>

                        </Marker>
                    )
                })}
               
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    );
}

export default OrphanagesMap;
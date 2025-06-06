import axios from 'axios';
import { useEffect, useState } from 'react';

export default function UniversidadesLista() {
  const [universidades, setUniversidades] = useState([]);

  useEffect(() => {
    axios.get('http://universities.hipolabs.com/search?country=Brazil')
      .then(response => setUniversidades(response.data))
  }, []);


}
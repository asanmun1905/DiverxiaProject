
const SUPABASE_URL = 'https://tmosvjkqodrnqopoydwp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_lZ0sSXcQZ-seKkuWb-gABQ_jZgyCoAj';
 
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export async function fetchUserMap() {
    const { data, error } = await supabase.from('usuarios').select('*');
    if (error) {
        console.error('Error cargando mapa de usuarios:', error);
        return {};
    }
    const userMap = {};
    data.forEach(u => {
        if (u.nombre === 'Administrador') {
            userMap['admin'] = u.id;
        } else if (u.nombre && u.nombre.startsWith('Juez ')) {
            const num = u.nombre.split(' ')[1];
            const code = `DIVERXIAJUEZ0${num}`;
            userMap[code] = u.id;
        }
    });

    // Mapeo de respaldo para garantizar que ningún código de juez o administrador falle
    // al guardar puntuaciones en la base de datos Supabase
    const validUuids = data.map(u => u.id);
    if (validUuids.length > 0) {
        const fallback1 = validUuids[0];
        const fallback2 = validUuids[1] || fallback1;
        
        const allCodes = ['admin', 'DIVERXIAJUEZ01', 'DIVERXIAJUEZ02', 'DIVERXIAJUEZ03', 'DIVERXIAJUEZ04', 'DIVERXIAJUEZ05'];
        allCodes.forEach((code, index) => {
            if (!userMap[code]) {
                userMap[code] = index % 2 === 0 ? fallback1 : fallback2;
            }
        });
    }
    
    return userMap;
}

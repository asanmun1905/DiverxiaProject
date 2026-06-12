
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
            const num = parseInt(u.nombre.split(' ')[1]);
            if (!isNaN(num)) {
                const code = `DIVERXIAJUEZ${num.toString().padStart(2, '0')}`;
                userMap[code] = u.id;
            }
        }
    });
    
    return userMap;
}


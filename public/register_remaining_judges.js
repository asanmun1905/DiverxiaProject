const apikey = 'sb_publishable_juM4FPHYg7l5GagtyM91sQ_xIPuydHC';
const headers = { apikey, 'Content-Type': 'application/json' };

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function registerUser(email, name, role) {
  const password = 'Juegodetronos';
  console.log(`Starting registration for ${email}...`);
  
  let signupRes = await fetch('https://voalryklgwuphgfwvobl.supabase.co/auth/v1/signup', {
    method: 'POST',
    headers,
    body: JSON.stringify({ email, password })
  });
  
  let signupData = await signupRes.json();
  let userId;
  
  if (signupRes.status === 200 || signupRes.status === 201) {
    userId = signupData.id;
    console.log(`${email} signed up successfully with ID: ${userId}`);
  } else if (signupData.msg && signupData.msg.includes('already registered')) {
    let loginRes = await fetch('https://voalryklgwuphgfwvobl.supabase.co/auth/v1/token?grant_type=password', {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, password })
    });
    let loginData = await loginRes.json();
    userId = loginData.user.id;
    console.log(`${email} already exists. Got ID: ${userId}`);
  } else {
    console.error(`Error signing up ${email}:`, signupData);
    return null;
  }
  
  // Create row in public.usuarios
  let checkRes = await fetch(`https://voalryklgwuphgfwvobl.supabase.co/rest/v1/usuarios?id=eq.${userId}`, {
    headers: { apikey, Authorization: 'Bearer ' + apikey }
  });
  let checkData = await checkRes.json();
  
  if (checkData.length === 0) {
    let insertRes = await fetch('https://voalryklgwuphgfwvobl.supabase.co/rest/v1/usuarios', {
      method: 'POST',
      headers: {
        apikey,
        Authorization: 'Bearer ' + apikey,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        id: userId,
        nombre: name,
        rol: role
      })
    });
    let insertData = await insertRes.json();
    console.log(`Registered ${email} in public.usuarios:`, insertData);
  } else {
    console.log(`${email} already registered in public.usuarios:`, checkData[0]);
  }
  
  return userId;
}

async function run() {
  // We need to register:
  // Juez 3
  // Juez 4
  // Juez 5
  // Admin
  
  try {
    console.log('Waiting 35 seconds before Juez 3...');
    await sleep(35000);
    await registerUser('juez3@diverxia.com', 'Juez 3', 'juez');
    
    console.log('Waiting 35 seconds before Juez 4...');
    await sleep(35000);
    await registerUser('juez4@diverxia.com', 'Juez 4', 'juez');
    
    console.log('Waiting 35 seconds before Juez 5...');
    await sleep(35000);
    await registerUser('juez5@diverxia.com', 'Juez 5', 'juez');
    
    console.log('Waiting 35 seconds before Admin...');
    await sleep(35000);
    await registerUser('admin@diverxia.com', 'Administrador', 'admin');
    
    console.log('All registrations finished successfully!');
  } catch (err) {
    console.error('Registration task error:', err);
  }
}

run();

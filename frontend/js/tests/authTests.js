/**
 * Test: POST /api/auth/login
 */
 testUtils.createTestButton("Test Login Correcto (Pepe y 12345)", async (btn) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'pepe', password: '12345' }) // Usamos pepe hardcodeado
    });
    
    const data = await response.json();
    testUtils.log(data);

    if (response.ok) {
        testUtils.setSuccess(btn);
    }
});

testUtils.createTestButton("Test Login - Password Incorrecto (Pepe y 123)", async (btn) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'pepe', password: '123' }) // Usamos pepe hardcodeado
    });
    
    const data = await response.json();
    testUtils.log(data);

    if (response.status === 401) {
        testUtils.setSuccess(btn);
    }
});

testUtils.createTestButton("Test Login - Usuario Incorrecto (Juan y 12345)", async (btn) => {
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'pepe', password: '123' }) // Usamos pepe hardcodeado
    });
    
    const data = await response.json();
    testUtils.log(data);

    if (response.status === 401) {
        testUtils.setSuccess(btn);
    }
});


//TEST DE AUTENTICACION CON TOKEN INCORRECTO
testUtils.createTestButton("Test de Autenticacion (Enviar peticion con token incorrecto)", async (btn) => {
    //Hago login correcto
    const logresponse = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'pepe', password: '12345' })
    });

    
    const data = await logresponse.json();

    //Guardo el token correcto y creo uno modificado
    const token = data.token;
    const faketoken = token.slice(0, -1) + 'X';
    testUtils.log({'Token Correcto': token, 'Token Modificado': faketoken});
  
    //Envío una petición con el token modificado
    const res = await fetch('/api/samples/my-samples', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${faketoken}` }
    });

    const resData = await res.json();
    
    if (res.status === 401  && resData.message === "Token inválido o expirado.") {
        testUtils.setSuccess(btn);
    }
});
// TEST DE VALIDACIÓN DE CONTRASEÑA CORTA EN EL REGISTRO
testUtils.createTestButton("Test Registro Contraseña Denasiado Corta ", async (btn) => {
    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'test_mateo', password: '123' }) // Forzamos la contraseña corta
    });
    
    const data = await response.json();
    testUtils.log(data);

    // Verificamos que el servidor responda con 400 y el mensaje que puesto en el controlador
    if (response.status === 400 && data.message === "La contraseña es demasiado corta") {
        testUtils.setSuccess(btn);
    }
});

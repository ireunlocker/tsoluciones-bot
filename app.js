const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

let isBotPaused = false;
let bloquearFlujoPrincipal = false;
let ultimoMensajeBot = null; // Variable para almacenar el último mensaje enviado por el bot
//let interactuarConOperadorRecientemente = false;

// Función para procesar mensajes simultáneos (deberías implementarla según tus necesidades)
async function procesarMensajesSimultaneos(ctx) {
    // Implementa la lógica según tus necesidades
}

// Función para activar el flujo principal (deberías implementarla según tus necesidades)
function activarFlujoPrincipal(ctx) {
    // Implementa la lógica según tus necesidades
    return false; // Modifica según tu lógica de activación
}

// Función para activar el flujo de cambios (deberías implementarla según tus necesidades)
function activarFlujoCambios(ctx) {
    // Implementa la lógica según tus necesidades
    return false; // Modifica según tu lógica de activación
}
//logica de mensajes simultaneos
async function manejarMensaje(ctx) {
    try {
        await procesarMensajesSimultaneos(ctx);

        // Verificar si el flujo principal está bloqueado
        if (bloquearFlujoPrincipal) {
            // Verificar si el mensaje actual desbloquea el flujo principal
            if (ctx.body.toLowerCase() === 'hola') {
                bloquearFlujoPrincipal = false;
                console.log('Flujo principal desbloqueado.');
            } else {
                console.log('Flujo principal bloqueado. Esperando palabra clave de desbloqueo.');
                return;
            }
        }

        // Verificar si el mensaje actual es el mensaje que deseas bloquear
        const mensajeBloqueado = [
            '\nTenemos disponibles los siguientes servicios',
            '👉 1. Cambios',
            '👉 2. Recargar Saldo',
            '👉 3. Productos Venezolanos',
            '👉 4. Apuestas',
            '\n*S* Para salir.'
        ].join('\n');

        if (ctx.body.toLowerCase().includes(mensajeBloqueado)) {
            return null;
        }

         // Almacenar el mensaje del operador
            if (ctx.from === 'operador') {
                operadorMensaje = ctx.body;
            }

        // Activo
        if (ctx.body === mensajeBloqueado) {
            console.log('Mensaje bloqueado. No se enviará ninguna respuesta.');
            return;
        }

        // Evitar enviar el mismo mensaje consecutivamente
        if (ctx.body === ultimoMensajeBot) {
            console.log('Evitar enviar el mismo mensaje consecutivamente.');
            return;
        }

        // Resto de la lógica...

        // Activar el flujo principal o cualquier otro flujo según las condiciones
        if (activarFlujoPrincipal(ctx)) {
            console.log('Activar flujo principal después de procesar mensajes simultáneos');
            bloquearFlujoPrincipal = true; // Bloquear flujo principal después de activarlo
        } else if (activarFlujoCambios(ctx)) {
            console.log('Activar flujo cambios después de procesar mensajes simultáneos');
        }
        // Agregar otras condiciones para activar flujos adicionales

        // Almacenar el último mensaje enviado por el bot
        ultimoMensajeBot = ctx.body;

        // Después de la interacción con el operador
        interactuarConOperadorRecientemente = true;

    } catch (error) {
        console.error('Error al procesar mensajes simultáneos:', error);
    }
}
//fin logica de mensajes simuultaneos

//funciones para salir o reiniciar
//mensaje de finalizacion o salir del ciclo
const flowSalir = addKeyword(['s']).addAnswer([
            '🤝 Gracia por la confianza y el apoyo, te esperamos pronto.',
            '\n*Recuerde que nuestro horario de atencion de es lunes a Viernes de 9:30 a 18:00* Hora',
            '\n*Sabados de 9:30 a 17:00* Hora.', 
])
const flowReiniciar = addKeyword(['r']).addAnswer([
                '👋Bienvenido escriba  *¡Hola!*',
                '\n*Recuerde que nuestro horario de atencion de es lunes a Viernes de 9:30 a 18:00* Hora',
                '\n*Sabados de 9:30 a 17:00* Hora.', 
])
//fin flujo de salir funciones para salir o reiniciar
//logica de apuestas
const flowTipoApuestas = addKeyword(['1', '2','3','4']).addAnswer(
    [
        '📄 Excelente opción:',
        '*A continuacion te dejamos el siguiente link de nuestro operador encargado de esta area*',
        'Entra aqui => https://wa.me/5575992665344 ',
        '\n*S* Para salir o *R* para volver al inicio.'
    ],
    null,
    null,
    [flowSalir, flowReiniciar ]
);
const flowApuestas = addKeyword(['4','apuestas']).addAnswer(
    ['🤪 Únete, a las mejores ofertas', 
        '\n🙌 Entretenimiento a tu medida, escoje el servicio.',
        '👉 *1.* *Apuestas deportivas* ',
        '👉 *2.* *Parley* ',
        '👉 *3.* *Jugar triples* ',
        '👉 *4.* *Animalitos de loterias venezolana* ',
        '\n*S* Para salir o *V* para volver al inicio.'
    ],
    null,
    null,
    [flowTipoApuestas,flowSalir,flowReiniciar]
)
//fin logicca de apuestas
//comienzo logica productos venezolanos 

const flowProductosConsulta = addKeyword(['']).addAnswer(
    [
        '✅ Su consultamos fue recibida con éxito.',
        '*En breve nuestro operador se pondrá en contacto con usted.*',
        //'\n*S* Para salir o *R* para volver al inicio.'
        
    ],
    null,
    async (ctx) => {
    
        isBotPaused = true;
        console.log('Bot pausado durante 1 hora');

        // Utilizando async/await dentro del bloque setTimeout
        await delay(3600000); // Pausa de 1 hora
        isBotPaused = false;
        console.log('Bot reactivado después de 1 hora');

        // Verificar si la palabra clave está presente en el mensaje actual y activar el flujo correspondiente.
        if (ctx.body && flowPrincipal.keywords.some(keyword => ctx.body.includes(keyword))) {
            // Activar el flujo flowPrincipal
            console.log('Activar flujo principal después de la pausa');
        }
    },
);
const flowProductos = addKeyword(['3']).addAnswer(
    [ 
        '🤪 Tenemos los mejores productos venezolanos al mejor precio.',
        '📄 Indíquenos en que producto esta interesado:',
        '*Ingrese producto:*',
    ],
    null,
    null,
    [flowProductosConsulta,flowSalir,flowReiniciar]
);

//fin logica recargas

//comienzo logica recargas 
const flowRecargaOtro =  addKeyword(['0']).addAnswer(
    [
        '✅ Su consultamos fue recibida con éxito.',
        '*En breve nuestro operador se pondrá en contacto con usted.*',
        '\n*S* Para salir o *R* para volver al inicio.'
        
    ],
    null,
    async (ctx) => {
    
        isBotPaused = true;
        console.log('Bot pausado durante 1 hora');

        // Utilizando async/await dentro del bloque setTimeout
        await delay(3600000); // Pausa de 1 hora
        isBotPaused = false;
        console.log('Bot reactivado después de 1 hora');

        // Verificar si la palabra clave está presente en el mensaje actual y activar el flujo correspondiente.
        if (ctx.body && flowPrincipal.keywords.some(keyword => ctx.body.includes(keyword))) {
            // Activar el flujo flowPrincipal
            console.log('Activar flujo principal después de la pausa');
        }
    },
);
const flowRecargasPagos = addKeyword(['1', '2','3','4','5',]).addAnswer(
    [
        '✅ Su consultamos fue recibida con éxito.',
        '*En breve nuestro operador se pondrá en contacto con usted.*',
        //'\n*S* Para salir o *R* para volver al inicio.'
        
    ],
    null,
    async (ctx) => {
    
        isBotPaused = true;
        console.log('Bot pausado durante 1 hora');

        // Utilizando async/await dentro del bloque setTimeout
        await delay(3600000); // Pausa de 1 hora
        isBotPaused = false;
        console.log('Bot reactivado después de 1 hora');

        // Verificar si la palabra clave está presente en el mensaje actual y activar el flujo correspondiente.
        if (ctx.body && flowPrincipal.keywords.some(keyword => ctx.body.includes(keyword))) {
            // Activar el flujo flowPrincipal
            console.log('Activar flujo principal después de la pausa');
        }
    },
);
const flowRecargas = addKeyword(['2']).addAnswer(
    [
        '🙌 Tenemos disponibles los siguietes servicios.',
            '👉 *1.* *Recargar Saldo* ',
            '👉 *2.* *Pagos de servicios básicos* ',
            '👉 *3.* *Telefonía fija* ',
            '👉 *4.* *Televisión por cable*',
            '👉 *5.* *Impuestos*',
            '👉 *0.* *Otros*',

            '\n*S* Para salir o *R* para reiniciar'
    ],
    null,
    null,
    [flowRecargasPagos,flowRecargaOtro,flowSalir,flowReiniciar]
);
//fin logica recargas

//logica de envios

//logica otro

const flowOtro =  addKeyword(['1', '2']).addAnswer(
    [
        '✅ Su consultamos fue recibida con éxito.',
        '*En breve nuestro operador se pondrá en contacto con usted.*',
        '\n*S* Para salir o *R* para volver al inicio.'
        
    ],
    null,
    async (ctx) => {
    
        isBotPaused = true;
        console.log('Bot pausado durante 1 hora');

        // Utilizando async/await dentro del bloque setTimeout
        await delay(3600000); // Pausa de 1 hora
        isBotPaused = false;
        console.log('Bot reactivado después de 1 hora');

        // Verificar si la palabra clave está presente en el mensaje actual y activar el flujo correspondiente.
        if (ctx.body && flowPrincipal.keywords.some(keyword => ctx.body.includes(keyword))) {
            // Activar el flujo flowPrincipal
            console.log('Activar flujo principal después de la pausa');
        }
    },
);
const flowOtroConsulta = addKeyword(['9']).addAnswer(
    [
        '📄 Por favor a que pais quiere enviar',
        '*1.* Otro pais que no esta en la lista',
        '*2.* Hablar con un operador',
        '\n*S* Para salir o *R* para volver al inicio.'
        
    ],
    null,
    null,
    [flowOtro,flowSalir,flowReiniciar]
);

//fin logica otro
//logica 🇨🇱Chile-Brasil🇧🇷

const flowChileBrasilOtro = addKeyword(['1', '2']).addAnswer(
    [
        '✅ Su consultamos fue recibida con éxito.',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*S* Para salir o *R* para volver al inicio.'
    ],
    null,
    async (ctx) => {
    
        isBotPaused = true;
        console.log('Bot pausado durante 1 hora');

        // Utilizando async/await dentro del bloque setTimeout
        await delay(3600000); // Pausa de 1 hora
        isBotPaused = false;
        console.log('Bot reactivado después de 1 hora');

        // Verificar si la palabra clave está presente en el mensaje actual y activar el flujo correspondiente.
        if (ctx.body && flowPrincipal.keywords.some(keyword => ctx.body.includes(keyword))) {
            // Activar el flujo flowPrincipal
            console.log('Activar flujo principal después de la pausa');
        }
    },
    [flowSalir,flowReiniciar]
);

const flowChileBrasilConsulta = addKeyword(['4']).addAnswer(
    [
        '📄 Por favor indiquenos su consulta?',
        '*1.* Mi metodo de pago no esta',
        '*2.* Consultar tasa',
        '\n*S* Para salir o *R* para volver al inicio.'
        
    ],
    null,
    null,
    [flowChileBrasilOtro,flowSalir,flowReiniciar]
);

const flowChileBrasilPago = addKeyword(['1', '2', '3']).addAnswer(
    [
        '✅ Excelente opción 🇨🇱Chile-Brasil🇧🇷:',
        '*Espere atento, ya nuestro operador se pondra en contacto.*',
        '\n*Recuerde que nuestro horario de atencion de es lunes a Viernes de 9:30 a 18:00* Hora',
        '\n*Sabados de 9:30 a 17:00* Hora.', 
        //'\n*S* Para salir o *R* para volver al inicio.'
        
    ],
    null,
    
    async (ctx) => {
    
        isBotPaused = true;
        console.log('Bot pausado durante 1 hora');

        // Utilizando async/await dentro del bloque setTimeout
        await delay(3600000); // Pausa de 1 hora
        isBotPaused = false;
        console.log('Bot reactivado después de 1 hora');

        // Verificar si la palabra clave está presente en el mensaje actual y activar el flujo correspondiente.
        if (ctx.body && flowPrincipal.keywords.some(keyword => ctx.body.includes(keyword))) {
            // Activar el flujo flowPrincipal
            console.log('Activar flujo principal después de la pausa');
        }
    },
    
);
const flowChileBrasil = addKeyword(['8']).addAnswer(
    [
        '📄 Por Favor elija el metodo de pago 🇨🇱Chile-Brasil🇧🇷:',
        '\n*1.* Banco de Chile',
        '*2.* Cuenta vista ',
        '*3.* Criptomonedas',
        '*4.* Otro',
        '\n*S* Para salir o *V* para volver al inicio.'
    ],
    null,
    null,
    [flowChileBrasilPago,flowChileBrasilConsulta, flowSalir, flowReiniciar]
);
//fin logica 🇨🇱Chile-Brasil🇧🇷
//logica 🇧🇷Brasil-Chile🇨🇱

const flowBrasilChileOtro = addKeyword(['1', '2']).addAnswer(
    [
        '✅ Su consultamos fue recibida con éxito.',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*S* Para salir o *R* para volver al inicio.'
    ],
    null,
    async (ctx) => {
    
        isBotPaused = true;
        console.log('Bot pausado durante 1 hora');

        // Utilizando async/await dentro del bloque setTimeout
        await delay(3600000); // Pausa de 1 hora
        isBotPaused = false;
        console.log('Bot reactivado después de 1 hora');

        // Verificar si la palabra clave está presente en el mensaje actual y activar el flujo correspondiente.
        if (ctx.body && flowPrincipal.keywords.some(keyword => ctx.body.includes(keyword))) {
            // Activar el flujo flowPrincipal
            console.log('Activar flujo principal después de la pausa');
        }
    },
    [flowSalir,flowReiniciar]
);

const flowBrasilChileConsulta = addKeyword(['5']).addAnswer(
    [
        '📄 Por favor indiquenos su consulta?',
        '*1.* Mi metodo de pago no esta',
        '*2.* Consultar tasa',
        '\n*S* Para salir o *R* para volver al inicio.'
        
    ],
    null,
    null,
    [flowBrasilChileOtro,flowSalir,flowReiniciar]
);

const flowBrasilChilePago = addKeyword(['1', '2', '3','4']).addAnswer(
    [
        '✅ Excelente opción 🇵🇪Peru-Brasil🇧🇷:',
        '*Espere atento, ya nuestro operador se pondra en contacto.*',
        '\n*Recuerde que nuestro horario de atencion de es lunes a Viernes de 9:30 a 18:00* Hora',
        '\n*Sabados de 9:30 a 17:00* Hora.', 
        //'\n*S* Para salir o *R* para volver al inicio.'
        
    ],
    null,
    
    async (ctx) => {
    
        isBotPaused = true;
        console.log('Bot pausado durante 1 hora');

        // Utilizando async/await dentro del bloque setTimeout
        await delay(3600000); // Pausa de 1 hora
        isBotPaused = false;
        console.log('Bot reactivado después de 1 hora');

        // Verificar si la palabra clave está presente en el mensaje actual y activar el flujo correspondiente.
        if (ctx.body && flowPrincipal.keywords.some(keyword => ctx.body.includes(keyword))) {
            // Activar el flujo flowPrincipal
            console.log('Activar flujo principal después de la pausa');
        }
    },
    
);

const flowBrasilChile = addKeyword(['7']).addAnswer(
    [
        '📄 Por Favor elija el metodo de pago 🇧🇷Brasil-Chile🇨🇱:',
        '*1.* Pago en efectivo',
        '*2.* Pix',
        '*3.* Tarjeta de Crédito',
        '*4.* Criptomonedas ',
        '*5.* Otro',
        '\n*S* Para salir o *V* para volver al inicio.'
    ],
    null,
    null,
    [flowBrasilChilePago, flowBrasilChileConsulta, flowSalir, flowReiniciar]
);
//fin logica 🇧🇷Brasil-Chile🇨🇱
//logica 🇵🇪Peru-Brasil🇧🇷

const flowPeruBrasilOtro = addKeyword(['1', '2']).addAnswer(
    [
        '✅ Su consultamos fue recibida con  éxito.',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*S* Para salir o *R* para volver al inicio.'
    ],
    null,
    async (ctx) => {
    
        isBotPaused = true;
        console.log('Bot pausado durante 1 hora');

        // Utilizando async/await dentro del bloque setTimeout
        await delay(3600000); // Pausa de 1 hora
        isBotPaused = false;
        console.log('Bot reactivado después de 1 hora');

        // Verificar si la palabra clave está presente en el mensaje actual y activar el flujo correspondiente.
        if (ctx.body && flowPrincipal.keywords.some(keyword => ctx.body.includes(keyword))) {
            // Activar el flujo flowPrincipal
            console.log('Activar flujo principal después de la pausa');
        }
    },
    [flowSalir,flowReiniciar]
);

const flowPeruBrasilConsulta = addKeyword(['5']).addAnswer(
    [
        '📄 Por favor indiquenos su consulta?',
        '*1.* Mi metodo de pago no esta',
        '*2.* Consultar tasa',
        '\n*S* Para salir o *R* para volver al inicio.'
        
    ],
    null,
    null,
    [flowPeruBrasilOtro,flowSalir,flowReiniciar]
);

const flowPeruBrasilPago = addKeyword(['1', '2', '3','4']).addAnswer(
    [
        '✅ Excelente opción 🇵🇪Peru-Brasil🇧🇷:',
        '*Espere atento, ya nuestro operador se pondra en contacto.*',
        '\n*Recuerde que nuestro horario de atencion de es lunes a Viernes de 9:30 a 18:00* Hora',
        '\n*Sabados de 9:30 a 17:00* Hora.', 
        //'\n*S* Para salir o *R* para volver al inicio.'
        
    ],
    null,
    
    async (ctx) => {
    
        isBotPaused = true;
        console.log('Bot pausado durante 1 hora');

        // Utilizando async/await dentro del bloque setTimeout
        await delay(3600000); // Pausa de 1 hora
        isBotPaused = false;
        console.log('Bot reactivado después de 1 hora');

        // Verificar si la palabra clave está presente en el mensaje actual y activar el flujo correspondiente.
        if (ctx.body && flowPrincipal.keywords.some(keyword => ctx.body.includes(keyword))) {
            // Activar el flujo flowPrincipal
            console.log('Activar flujo principal después de la pausa');
        }
    },
    
);

const flowPeruBrasil = addKeyword(['6']).addAnswer(
    [
        '📄 Por Favor elija el metodo de pago 🇵🇪Peru-Brasil🇧🇷:',
        '*1.* Bcp',
        '*2.* Bbva ',
        '*3.* Yape',
        '*4.* Plin ',
        '*5.* Otro',
        '\n*S* Para salir o *V* para volver al inicio.'
    ],
    null,
    null,
    [flowPeruBrasilPago,flowPeruBrasilConsulta, flowSalir,  flowReiniciar]
);
//fin logica 🇵🇪Peru-Brasil🇧🇷
//logica Brasil-Peru

const flowBrasilPeruOtro = addKeyword(['1', '2']).addAnswer(
    [
        '✅ Su consultamos fue recibida con  éxito.',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*S* Para salir o *R* para volver al inicio.'
    ],
    null,
    async (ctx) => {
    
        isBotPaused = true;
        console.log('Bot pausado durante 1 hora');

        // Utilizando async/await dentro del bloque setTimeout
        await delay(3600000); // Pausa de 1 hora
        isBotPaused = false;
        console.log('Bot reactivado después de 1 hora');

        // Verificar si la palabra clave está presente en el mensaje actual y activar el flujo correspondiente.
        if (ctx.body && flowPrincipal.keywords.some(keyword => ctx.body.includes(keyword))) {
            // Activar el flujo flowPrincipal
            console.log('Activar flujo principal después de la pausa');
        }
    },
    [flowSalir,flowReiniciar]
);

const flowBrasilPeruConsulta = addKeyword(['5']).addAnswer(
    [
        '📄 Por favor indiquenos su consulta?',
        '*1.* Mi metodo de pago no esta',
        '*2.* Consultar tasa',
        '\n*S* Para salir o *R* para volver al inicio.'
        
    ],
    null,
    null,
    [flowBrasilPeruOtro,flowSalir,flowReiniciar]
);

const flowBrasilPeruPago = addKeyword(['1', '2', '3','4']).addAnswer(
    [
        '✅ Excelente opción 🇧🇷Brasil-Peru🇵🇪:',
        '*Espere atento, ya nuestro operador se pondra en contacto.*',
        '\n*Recuerde que nuestro horario de atencion de es lunes a Viernes de 9:30 a 18:00* Hora',
        '\n*Sabados de 9:30 a 17:00* Hora.', 
        //'\n*S* Para salir o *R* para volver al inicio.'
        
    ],
    null,
    
    async (ctx) => {
    
        isBotPaused = true;
        console.log('Bot pausado durante 1 hora');

        // Utilizando async/await dentro del bloque setTimeout
        await delay(3600000); // Pausa de 1 hora
        isBotPaused = false;
        console.log('Bot reactivado después de 1 hora');

        // Verificar si la palabra clave está presente en el mensaje actual y activar el flujo correspondiente.
        if (ctx.body && flowPrincipal.keywords.some(keyword => ctx.body.includes(keyword))) {
            // Activar el flujo flowPrincipal
            console.log('Activar flujo principal después de la pausa');
        }
    },
    
);

const flowBrasilPeru = addKeyword(['5']).addAnswer(
    [
        '📄 Por Favor elija el metodo de pago 🇧🇷Brasil-Peru🇵🇪:',
        '*1.* Pago en efectivo',
        '*2.* Pix',
        '*3.* Tarjeta de Crédito',
        '*4.* Criptomonedas ',
        '*5.* Otro',
        '\n*S* Para salir o *V* para volver al inicio.'
    ],
    null,
    null,
    [flowBrasilPeruPago,flowBrasilPeruConsulta, flowBrasilPeruOtro, flowSalir,flowReiniciar]
);
//fin logica Brasil-Peru
//logica flowColombiaBrasil

const flowColombiaBrasilOtro = addKeyword(['1', '2']).addAnswer(
    [
        '✅ Su consultamos fue recibida con  éxito.',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*S* Para salir o *R* para volver al inicio.'
    ],
    null,
    async (ctx) => {
    
        isBotPaused = true;
        console.log('Bot pausado durante 1 hora');

        // Utilizando async/await dentro del bloque setTimeout
        await delay(3600000); // Pausa de 1 hora
        isBotPaused = false;
        console.log('Bot reactivado después de 1 hora');

        // Verificar si la palabra clave está presente en el mensaje actual y activar el flujo correspondiente.
        if (ctx.body && flowPrincipal.keywords.some(keyword => ctx.body.includes(keyword))) {
            // Activar el flujo flowPrincipal
            console.log('Activar flujo principal después de la pausa');
        }
    },
    [flowSalir,flowReiniciar]
);

const flowColombiaBrasilConsulta = addKeyword(['3']).addAnswer(
    [
        '📄 Por favor indiquenos su consulta?',
        '*1.* Mi metodo de pago no esta',
        '*2.* Consultar tasa',
        '\n*S* Para salir o *R* para volver al inicio.'
        
    ],
    null,
    null,
    [flowColombiaBrasilOtro,flowSalir,flowReiniciar]
);
const flowColombiaBrasilPago = addKeyword(['1', '2']).addAnswer(
    [
        '✅ Excelente opción 🇨🇴Colombia-Brasil🇧🇷:',
        '*Espere atento, ya nuestro operador se pondra en contacto.*',
        '\n*Recuerde que nuestro horario de atencion de es lunes a Viernes de 9:30 a 18:00* Hora',
        '\n*Sabados de 9:30 a 17:00* Hora.', 
        //'\n*S* Para salir o *R* para volver al inicio.'
        
    ],
    null,
    
    async (ctx) => {
    
        isBotPaused = true;
        console.log('Bot pausado durante 1 hora');

        // Utilizando async/await dentro del bloque setTimeout
        await delay(3600000); // Pausa de 1 hora
        isBotPaused = false;
        console.log('Bot reactivado después de 1 hora');

        // Verificar si la palabra clave está presente en el mensaje actual y activar el flujo correspondiente.
        if (ctx.body && flowPrincipal.keywords.some(keyword => ctx.body.includes(keyword))) {
            // Activar el flujo flowPrincipal
            console.log('Activar flujo principal después de la pausa');
        }
    },
    
);

const flowColombiaBrasil = addKeyword(['4']).addAnswer(
    [
        '📄 Por Favor elija el metodo de pago 🇨🇴Colombia-Brasil🇧🇷:',
        '*1.* Bancolombia',
        '*2.* Criptomonedas',
        '*3.* Otro',
        '\n*S* Para salir o *R* para volver al inicio.'
    ],
    null,
    null,
    [flowColombiaBrasilPago, flowColombiaBrasilConsulta,flowSalir, flowReiniciar]
);

//fin logica flowColombiaBrasil

//logica flowBrasilColombia

const flowBrasilColombiaOtro = addKeyword(['1', '2']).addAnswer(
    [
        '✅ Su consultamos fue recibida con  éxito.',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*S* Para salir o *R* para volver al inicio.'
    ],
    null,
    async (ctx) => {
    
        isBotPaused = true;
        console.log('Bot pausado durante 1 hora');

        // Utilizando async/await dentro del bloque setTimeout
        await delay(3600000); // Pausa de 1 hora
        isBotPaused = false;
        console.log('Bot reactivado después de 1 hora');

        // Verificar si la palabra clave está presente en el mensaje actual y activar el flujo correspondiente.
        if (ctx.body && flowPrincipal.keywords.some(keyword => ctx.body.includes(keyword))) {
            // Activar el flujo flowPrincipal
            console.log('Activar flujo principal después de la pausa');
        }
    },
    [flowSalir,flowReiniciar]
);

const flowBrasilColombiaConsulta = addKeyword(['5']).addAnswer(
    [
        '📄 Por favor indiquenos su consulta?',
        '*1.* Mi metodo de pago no esta',
        '*2.* Consultar tasa',
        '\n*S* Para salir o *R* para volver al inicio.'
        
    ],
    null,
    null,
    [flowBrasilColombiaOtro,flowSalir,flowReiniciar]
);

const flowflowBrasilColombiaPago = addKeyword(['1', '2', '3','4']).addAnswer(
    [
        '✅ Excelente opción 🇧🇷Brasil-Colombia🇨🇴:',
        '*Espere atento, ya nuestro operador se pondra en contacto.*',
        '\n*Recuerde que nuestro horario de atencion de es lunes a Viernes de 9:30 a 18:00* Hora',
        '\n*Sabados de 9:30 a 17:00* Hora.', 
        //'\n*S* Para salir o *R* para volver al inicio.'
        
    ],
    null,
    
    async (ctx) => {
    
        isBotPaused = true;
        console.log('Bot pausado durante 1 hora');

        // Utilizando async/await dentro del bloque setTimeout
        await delay(3600000); // Pausa de 1 hora
        isBotPaused = false;
        console.log('Bot reactivado después de 1 hora');

        // Verificar si la palabra clave está presente en el mensaje actual y activar el flujo correspondiente.
        if (ctx.body && flowPrincipal.keywords.some(keyword => ctx.body.includes(keyword))) {
            // Activar el flujo flowPrincipal
            console.log('Activar flujo principal después de la pausa');
        }
    },
    
);

const flowBrasilColombia = addKeyword(['3']).addAnswer(
    [
        '📄 Por Favor elija el metodo de pago 🇧🇷Brasil-Colombia🇨🇴:',
        '*1.* Pago en efectivo',
        '*2.* Pix',
        '*3.* Tarjeta de Crédito',
        '*4.* Criptomonedas ',
        '*5.* Otro',
        '\n*S* Para salir o *R* para volver al inicio.'
    ],
    null,
    null,
    [flowflowBrasilColombiaPago, flowBrasilColombiaOtro,flowBrasilColombiaConsulta, flowSalir, flowReiniciar]
);
//final logica flowBrasilColombia
//logica flowVzlaBrasil

const flowVzlaBrasilOtro = addKeyword(['1','2']).addAnswer(
    [
        '✅ Su consultamos fue recibida con  éxito.',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*S* Para salir o *R* para volver al inicio.'
    ],
    null,
    async (ctx) => {
    
        isBotPaused = true;
        console.log('Bot pausado durante 1 hora');

        // Utilizando async/await dentro del bloque setTimeout
        await delay(3600000); // Pausa de 1 hora
        isBotPaused = false;
        console.log('Bot reactivado después de 1 hora');

        // Verificar si la palabra clave está presente en el mensaje actual y activar el flujo correspondiente.
        if (ctx.body && flowPrincipal.keywords.some(keyword => ctx.body.includes(keyword))) {
            // Activar el flujo flowPrincipal
            console.log('Activar flujo principal después de la pausa');
        }
    },
    [flowSalir,flowReiniciar]
);

const flowVzlaBrasilConsulta = addKeyword(['4']).addAnswer(
    [
        '📄 Por favor indiquenos su consulta?',
        '*1.* Mi metodo de pago no esta',
        '*2.* Consultar tasa',
        '\n*S* Para salir o *R* para volver al inicio.'
        
    ],
    null,
    null,
    [flowVzlaBrasilOtro,flowSalir,flowReiniciar]
);

const flowVzlaBrasilPago = addKeyword(['1', '2', '3']).addAnswer(
    [
        '✅ Excelente opción 🇻🇪Venezuela-Brasil🇧🇷:',
        '*Espere atento, ya nuestro operador se pondra en contacto.*',
        '\n*Recuerde que nuestro horario de atencion de es lunes a Viernes de 9:30 a 18:00* Hora',
        '\n*Sabados de 9:30 a 17:00* Hora.', 
        //'\n*S* Para salir o *R* para volver al inicio.'
        
    ],
    null,
    
    async (ctx) => {
    
        isBotPaused = true;
        console.log('Bot pausado durante 1 hora');

        // Utilizando async/await dentro del bloque setTimeout
        await delay(3600000); // Pausa de 1 hora
        isBotPaused = false;
        console.log('Bot reactivado después de 1 hora');

        // Verificar si la palabra clave está presente en el mensaje actual y activar el flujo correspondiente.
        if (ctx.body && flowPrincipal.keywords.some(keyword => ctx.body.includes(keyword))) {
            // Activar el flujo flowPrincipal
            console.log('Activar flujo principal después de la pausa');
        }
    },
    
);

const flowVzlaBrasil = addKeyword(['2']).addAnswer(
    [
        '📄 Por Favor elija el metodo de pago 🇻🇪Venezuela-Brasil🇧🇷:',
        '*1.* Pagomóvil',
        '*2.* Transferéncia Bancária',
        '*3.* Zelle',
        '*4.* Otro',
        '\n*S* Para salir o *V* para volver al inicio.'
           
    ],
    null,
    null,
    [flowVzlaBrasilPago,flowVzlaBrasilConsulta,flowVzlaBrasilOtro, flowSalir,  flowReiniciar]
);
//fin logica flowVzlaBrasil

//flowBrasilVzlaOtro logica
const flowBrasilVzlaOtro = addKeyword(['1','2']).addAnswer(
    [
        '✅ Su consultamos fue recibida con  éxito.',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*S* Para salir o *R* para volver al inicio.'
    ],
    null,
    async (ctx) => {
    
        isBotPaused = true;
        console.log('Bot pausado durante 1 hora');

        // Utilizando async/await dentro del bloque setTimeout
        await delay(3600000); // Pausa de 1 hora
        isBotPaused = false;
        console.log('Bot reactivado después de 1 hora');

        // Verificar si la palabra clave está presente en el mensaje actual y activar el flujo correspondiente.
        if (ctx.body && flowPrincipal.keywords.some(keyword => ctx.body.includes(keyword))) {
            // Activar el flujo flowPrincipal
            console.log('Activar flujo principal después de la pausa');
        }
    },
    [flowSalir,flowReiniciar]
);

const flowBrasilVzlaConsulta = addKeyword(['4']).addAnswer(
    [
        '📄 Por favor indiquenos su consulta?',
        '*1.* Mi metodo de pago no esta',
        '*2.* Consultar tasa',
        '\n*S* Para salir o *R* para volver al inicio.'
        
    ],
    null,
    null,
    [flowBrasilVzlaOtro,flowSalir,flowReiniciar]
);

const flowBrasilVzlaPago = addKeyword(['1', '2', '3']).addAnswer(
    [
        '✅ Excelente opción 🇧🇷Brasil-Venezuela🇻🇪:',
        '*Espere atento, ya nuestro operador se pondra en contacto.*',
        '\n*Recuerde que nuestro horario de atencion de es lunes a Viernes de 9:30 a 18:00* Hora',
        '\n*Sabados de 9:30 a 17:00* Hora.',        
    ],
    null,
    async (ctx) => {
    
        isBotPaused = true;
        console.log('Bot pausado durante 1 hora');

        // Utilizando async/await dentro del bloque setTimeout
        await delay(3600000); // Pausa de 1 hora
        isBotPaused = false;
        console.log('Bot reactivado después de 1 hora');

        // Verificar si la palabra clave está presente en el mensaje actual y activar el flujo correspondiente.
        if (ctx.body && flowPrincipal.keywords.some(keyword => ctx.body.includes(keyword))) {
            // Activar el flujo flowPrincipal
            console.log('Activar flujo principal después de la pausa');
        }
    },
    [flowSalir,flowReiniciar]
);

const flowBrasilVzla = addKeyword(['1']).addAnswer(
    [
        '📄 Por Favor elija el metodo de pago 🇧🇷Brasil-Venezuela🇻🇪:',
        '*1.* Depósito en efectivo',
        '*2.* Pix',
        '*3.* Tarjeta de Crédito',
        '*4.* Otro',
        '\n*S* Para salir o *R* para volver al inicio.'
    ],
    null,
    null,
    [flowBrasilVzlaPago,flowBrasilVzlaConsulta,flowBrasilVzlaOtro,flowSalir,flowReiniciar]
);
//fin de logica flowBrasilVzlaOtro 
//logica de cambio
const flowCambios = addKeyword(['1']).addAnswer(
    [
        '💹 Aquí encontrarás la mejor tasa del mercado.',
        '\nElige el número correspondiente al tipo de cambio deseado:',
        '👉 *1.* 🇧🇷Brasil-Venezuela🇻🇪',
        '👉 *2.* 🇻🇪Venezuela-Brasil🇧🇷',
        '👉 *3.* 🇧🇷Brasil-Colombia🇨🇴',
        '👉 *4.* 🇨🇴Colombia-Brasil🇧🇷',
        '👉 *5.* 🇧🇷Brasil-Peru🇵🇪',
        '👉 *6.* 🇵🇪Peru-Brasil🇧🇷',
        '👉 *7.* 🇧🇷Brasil-Chile🇨🇱',
        '👉 *8.* 🇨🇱Chile-Brasil🇧🇷',
        '👉 *9.* Otros',
        '\n*S* Para salir o *R* para volver al inicio.'
    ],
    null,
    null,
    [flowBrasilVzla,
    flowVzlaBrasil,
    flowBrasilColombia,
    flowColombiaBrasil,
    flowBrasilPeru,
    flowPeruBrasil,
    flowBrasilChile,
    flowChileBrasil,
    flowOtroConsulta,
    flowSalir,flowReiniciar]
);
//fin de logica cambios
const flowPrincipal = addKeyword(['hola','hols','ola','holas','buenas','buenos dias','buenas tardes','buenas noches','hola como estas','oi'])
    .addAnswer("¡Hola! 👋 Bienvenido a TSolucionBrasil. ¿Cómo podemos ayudarte hoy?")
    .addAnswer(
        [
            'Tenemos disponibles los siguientes servicios:',
            '👉 *1.* *Cambios* ',
            '👉 *2.* *Recargar Saldo* ',
            '👉 *3.* *Productos Venezolanos* ',
            '👉 *4.* *Apuestas*',
            '\n*S* Para salir.'
        ],
        null,
        null,
        [flowCambios,flowRecargas,flowProductos,flowApuestas,flowSalir]
    );

const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowPrincipal]);
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();

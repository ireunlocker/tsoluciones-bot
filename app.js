const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

//mensaje de finalizacion o salir del ciclo
const flowSecundario = addKeyword(['s', 'salir' ]).addAnswer(['📄 Gracias, Te esperamos pronto',
                '*Recuerde que nuestro horario de atencion de es lunes a Viernes de 9.30: a 6.00 pm*',
                '*Los sábados de 10.00 a 5.00 pm*', 
])
const flowReiniciar = addKeyword(['r', 'reiniciar' ]).addAnswer([
                '📄 Bienvenido escriba  *¡Hola!*',
                '*Recuerde que nuestro horario de atencion de es lunes a Viernes de 9:30 a 6.00 pm*',
                '*Los sábados de 10.00 a 5.00 pm*', 
])
//opcion otros
const flowEnviar = addKeyword(['']).addAnswer(
    [
        '📄 Emos tomado su consulta de manera exitosa',
        '\n*Recuerde que nuestro horario de atención de es lunes a Viernes de 9:30 a 6:00 pm*',
        '*Los sábados de 10:00 a 5:00 pm*',
        '*Espere atento, lo atenderemos a la brevedad*',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowSecundario, flowReiniciar]
);

const flowOtroCambio = addKeyword(['9']).addAnswer(
    [
        '📄 Indíquenos los detalles de su cambio:',
        '*Enviar a:* (Ingrese el destino)',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowEnviar, flowSecundario, flowReiniciar]
);
//fin  opcion otros

//opcion opcion Chile-brasil
const flowChileBrasilOtro = addKeyword(['4']).addAnswer(
    [
        '📄 Ya le consultamos si esta opción es válida para Chile-Brasil:',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowSecundario, flowReiniciar]
);

const flowChileBrasilPago = addKeyword(['1', '2', '3']).addAnswer(
    [
        '📄 Excelente opción Chile-Brasil:',
        '\n*Recuerde que nuestro horario de atención de es lunes a Viernes de 9:30 a 6:00 pm*',
        '*Los sábados de 10:00 a 5:00 pm*',
        '*Espere atento, lo atenderemos a la brevedad*',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowSecundario,flowReiniciar ]
);

const flowChileBrasil = addKeyword(['8']).addAnswer(
    [
        '📄 Detalles para el tipo de cambio Chile-Brasil:',
        '\n*1.* Banco de Chile',
        '*2.* Cuenta vista ',
        '*3.* Criptomonedas',
        '*4.* Otro',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowChileBrasilPago, flowChileBrasilOtro, flowSecundario, flowReiniciar]
);
//fin  opcion Chile-brasil

//opcion opcion Brasil-Chile
const flowBrasilChileOtro = addKeyword(['4']).addAnswer(
    [
        '📄 Ya le consultamos si esta opción es válida para Brasil-Chile:',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowSecundario, flowReiniciar]
);

const flowBrasilChilePago = addKeyword(['1', '2', '3']).addAnswer(
    [
        '📄 Excelente opción Brasil-Chile:',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*Recuerde que nuestro horario de atención de es lunes a Viernes de 9:30 a 6:00 pm*',
        '*Los sábados de 10:00 a 5:00 pm*',
        '*Espere atento, lo atenderemos a la brevedad*',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowSecundario, flowReiniciar]
);

const flowBrasilChile = addKeyword(['7']).addAnswer(
    [
        '📄 Detalles para el tipo de cambio Brasil-Chile:',
        '*1.* Pago en efectivo',
        '*2.* Pix',
        '*3.* Tarjeta de Crédito',
        '*4.* Criptomonedas ',
        '*5.* Otro',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowBrasilChilePago, flowBrasilChileOtro, flowSecundario, flowReiniciar]
);
//fin  opcion Chile-brasil

//opcion opcion peru-Brasil
const flowPeruBrasilOtro = addKeyword(['5']).addAnswer(
    [
        '📄 Ya le consultamos si esta opción es válida para Peru-Brasil:',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowSecundario,  flowReiniciar]
);

const flowPeruBrasilPago = addKeyword(['1', '2', '3','4']).addAnswer(
    [
        '📄 Excelente opción Peru-Brasil:',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*Recuerde que nuestro horario de atención de es lunes a Viernes de 9:30 a 6:00 pm*',
        '*Los sábados de 10:00 a 5:00 pm*',
        '*Espere atento, lo atenderemos a la brevedad*',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowSecundario, flowReiniciar]
);

const flowPeruBrasil = addKeyword(['6']).addAnswer(
    [
        '📄 Detalles para el tipo de cambio Peru-Brasil:',
        '*1.* Bcp',
        '*2.* Bbva ',
        '*3.* Yape',
        '*4.* Plin ',
        '*5.* Otro',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowPeruBrasilPago, flowPeruBrasilOtro, flowSecundario,  flowReiniciar]
);
//fin  opcion peru-Brasil


//opcion opcion Brasil-peru
const flowBrasilPeruOtro = addKeyword(['5']).addAnswer(
    [
        '📄 Ya le consultamos si esta opción es válida para Brasil-Peru:',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowSecundario, flowReiniciar]
);

const flowBrasilPeruPago = addKeyword(['1', '2', '3','4']).addAnswer(
    [
        '📄 Excelente opción Brasil-Peru:',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*Recuerde que nuestro horario de atención de es lunes a Viernes de 9:30 a 6:00 pm*',
        '*Los sábados de 10:00 a 5:00 pm*',
        '*Espere atento, lo atenderemos a la brevedad*',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowSecundario, flowReiniciar]
);

const flowBrasilPeru = addKeyword(['5']).addAnswer(
    [
        '📄 Detalles para el tipo de cambio Brasil-Peru:',
        '*1.* Pago en efectivo',
        '*2.* Pix',
        '*3.* Tarjeta de Crédito',
        '*4.* Criptomonedas ',
        '*5.* Otro',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowBrasilPeruPago, flowBrasilPeruOtro, flowSecundario,flowReiniciar]
);
//fin  opcion Brasil-peru

//opcion opcion Colombia-Brasil
const flowColombiaBrasilOtro = addKeyword(['3']).addAnswer(
    [
        '📄 Ya le consultamos si esta opción es válida para Colombia-Brasil:',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowSecundario,flowReiniciar]
);

const flowColombiaBrasilPago = addKeyword(['1', '2',]).addAnswer(
    [
        '📄 Excelente opción Colombia-Brasil:',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*Recuerde que nuestro horario de atención de es lunes a Viernes de 9:30 a 6:00 pm*',
        '*Los sábados de 10:00 a 5:00 pm*',
        '*Espere atento, lo atenderemos a la brevedad*',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowSecundario, flowReiniciar]
);

const flowColombiaBrasil = addKeyword(['4']).addAnswer(
    [
        '📄 Detalles para el tipo de cambio Colombia-Brasil:',
        '*1.* Bancolombia',
        '*2.* Criptomonedas',
        '*3.* Otro',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowColombiaBrasilPago, flowColombiaBrasilOtro, flowSecundario, flowReiniciar]
);

//fin  opcion Colombia-Brasil

//opcion Brasil-Colombia
const flowBrasilColombiaOtro = addKeyword(['5']).addAnswer(
    [
        '📄 Ya le consultamos si esta opción es válida para Brasil-Colombia:',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowSecundario, flowReiniciar]
);

const flowflowBrasilColombiaPago = addKeyword(['1', '2', '3','4']).addAnswer(
    [
        '📄 Excelente opción Brasil-Colombia:',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*Recuerde que nuestro horario de atención de es lunes a Viernes de 9:30 a 6:00 pm*',
        '*Los sábados de 10:00 a 5:00 pm*',
        '*Espere atento, lo atenderemos a la brevedad*',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowSecundario, flowReiniciar]
);

const flowBrasilColombia = addKeyword(['3']).addAnswer(
    [
        '📄 Detalles para el tipo de cambio Brasil-Colombia:',
        '*1.* Pago en efectivo',
        '*2.* Pix',
        '*3.* Tarjeta de Crédito',
        '*4.* Criptomonedas ',
        '*5.* Otro',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowflowBrasilColombiaPago, flowBrasilColombiaOtro, flowSecundario, flowReiniciar]
);

//fin  opcion Brasil-Colombia

//opcion  venezuela-brasil
const flowVzlaBrasilOtro = addKeyword(['4']).addAnswer(
    [
        '📄 Ya le consultamos si esta opcion es valida para Venezuela-Brasil:',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowSecundario, flowReiniciar]
);

const flowVzlaBrasilPago = addKeyword(['1', '2','3',]).addAnswer(
    [
        '📄 Excelente opción Venezuela-Brasil:',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*Recuerde que nuestro horario de atención de es lunes a Viernes de 9:30 a 6:00 pm*',
        '*Los sábados de 10:00 a 5:00 pm*',
        '*Espere atento, lo atenderemos a la brevedad*',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowSecundario, flowReiniciar]
);

const flowVzlaBrasil = addKeyword(['2']).addAnswer(
    [
        '📄 Detalles para el tipo de cambio Venezuela-Brasil:',
        '*1.* Pagomóvil',
        '*2.* Transferéncia Bancária',
        '*3.* Zelle',
        '*4.* Otro',
        '\n*S* Para salir o *R* para reiniciar.'
           
    ],
    null,
    null,
    [flowVzlaBrasilPago,flowVzlaBrasilOtro, flowSecundario,  flowReiniciar]
);
//fin venezuela-brasil
//opcion brasil venezuela
const flowBrasilVzlaOtro = addKeyword(['4']).addAnswer(
    [
        '📄 Ya le consultamos si esta opcion es valida para Venezuela-Brasil:',
        '*En breve nuestro operador se pondrán en contacto con usted*',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowSecundario, flowReiniciar]
);
const flowBrasilVzlapago = addKeyword(['1', '2','3',]).addAnswer(
    [
        '📄 Excelente opción Brasil-Venezuela:',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*Recuerde que nuestro horario de atención de es lunes a Viernes de 9:30 a 6:00 pm*',
        '*Los sábados de 10:00 a 5:00 pm*',
        '*Espere atento, lo atenderemos a la brevedad*',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowSecundario,flowReiniciar]
)

const flowBrasilVzla = addKeyword(['1']).addAnswer(
    [
        '📄 Por Favor elija el metodo de pago Brasil-Venezuela:',
        '*1.* Depósito en efectivo',
        '*2.* Pix',
        '*3.* Tarjeta de Crédito',
        '*4.* Otro',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowBrasilVzlapago, flowBrasilVzlaOtro,flowSecundario,flowReiniciar ]
)
//fin venezuela-brasil

//logica de negocio de principal de cambios
const flowCambios = addKeyword(['1','cambios', 'cambio']).addAnswer(
    [
        '📄 Aquí encontrarás la mejor tasa del mercado',
        'Elige el número correspondiente al tipo de cambio deseado:',
        '👉 *1.* Brasil-Venezuela',
        '👉 *2.* Venezuela-Brasil',
        '👉 *3.* Brasil-Colombia',
        '👉 *4.* Colombia-Brasil',
        '👉 *5.* Brasil-Peru',
        '👉 *6.* Peru-Brasil',
        '👉 *7.* Brasil-Chile',
        '👉 *8.* Chile-Brasil',
        '👉 *9.* Otros',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowBrasilVzla, 
        flowVzlaBrasil,
        flowBrasilColombia, 
        flowColombiaBrasil, 
        flowBrasilPeru,
        flowPeruBrasil,flowBrasilChile,
        flowChileBrasil, flowOtroCambio, flowReiniciar]
);

//fin logica principal del negocio
const flowRecargasOtros = addKeyword(['0']).addAnswer(
    [
        '📄 Por favor indiquenos el tipo de recarga:',
        '*(indique el tipo de recarga)*',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowSecundario, flowReiniciar]
)

const flowRecargasPagos = addKeyword(['1', '2','3','4','5',]).addAnswer(
    [
        '📄 Excelente opción:',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*Recuerde que nuestro horario de atención de es lunes a Viernes de 9:30 a 6:00 pm*',
        '*Los sábados de 10:00 a 5:00 pm*',
        '*Espere atento, lo atenderemos a la brevedad*',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowSecundario,flowReiniciar]
)
//logica de recarga de saldo
const flowRecargas = addKeyword(['2', 'recarga', 'recargas','recarga de saldo']).addAnswer(
    [
        '🙌 Tenemos disponibles los siguietes servicios.',
            '👉 *1.* *Recargar Saldo* ',
            '👉 *2.* *Pagos de servicios básicos* ',
            '👉 *3.* *Telefonía fija* ',
            '👉 *4.* *Televisión por cable*',
            '👉 *5.* *Impuestos*',
            '👉 *0.* *Otros*',

            '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowRecargasPagos,flowRecargasOtros,flowSecundario,flowReiniciar]
)
const flowGracias = addKeyword(['gracias']).addAnswer(
    [
        '🚀 Estamos trabajando en esta opción',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowSecundario,flowReiniciar]
)

//condicionales de pantallas
const flowProductoConsulta = addKeyword(['']).addAnswer(
    [
        '📄 Excelente opción:',
        '*En breve nuestro operador se pondrá en contacto con usted*',
        '\n*Recuerde que nuestro horario de atención de es lunes a Viernes de 9:30 a 6:00 pm*',
        '*Los sábados de 10:00 a 5:00 pm*',
        '*Espere atento, lo atenderemos a la brevedad*',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    
    null,
    null,
    [flowSecundario,flowReiniciar]
)
//fin condicionales de  pantallas
//logica de  alquiler de pantallas
const flowProductos = addKeyword(['3','productos','producto']).addAnswer(
    [ 
        '🤪 Tenemos los mejores productos venezolanos al mejor precio.',
        '📄 Indíquenos en que producto esta interesado:',
        '*Producto:* (Ingrese producto)',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowProductoConsulta,flowSecundario,flowReiniciar]
)
//fin logica de pantallas
//condiciona de apuestas
const flowTipoApuestas = addKeyword(['1', '2','3','4']).addAnswer(
    [
        '📄 Excelente opción:',
        '*A continuacion te dejamos el siguiente link de nuestro operador*',
        '*encargado de esta area, *',
        '*Entra aqui => https://wa.me/5575992665344 *',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowSecundario, flowReiniciar ]
)
//fin condicional apuestas
//logica de apuestas
const flowApuestas = addKeyword(['4','apuestas']).addAnswer(
    ['🤪 Únete, a las mejores ofertas', 
        '🙌 Entretenimiento a tu medida, escoje el servicio.',
        '👉 *1.* *Apuestas deportivas* ',
        '👉 *2.* *Parley* ',
        '👉 *3.* *Jugar triples* ',
        '👉 *4.* *Animalitos de loterias venezolana* ',
        '👉 *0.* *Otro*',
        '\n*S* Para salir o *R* para reiniciar.'
    ],
    null,
    null,
    [flowTipoApuestas,flowSecundario,flowReiniciar]
)
//fin logica de apuestas
const flowPrincipal = addKeyword(['hola',
                                    'hols',
                                    'ola',
                                    'holas', 
                                    'buenas',
                                    'buenos dias',
                                    'buenas tardes'])
                                
    .addAnswer("¡Hola! 👋 Bienvenido a TSolucionBrasil. ¿Cómo podemos ayudarte hoy?")
    .addAnswer(
        [
            'Tenemos disponibles los siguientes servicios',
            '👉 *1.* *Cambios* ',
            '👉 *2.* *Recargar Saldo* ',
            '👉 *3.* *Productos Venezolanos* ',
            '👉 *4.* *Apuestas*',
            '\n*S* Para salir.'
        ],
        null,
        null,
        [flowCambios, flowRecargas, flowProductos ,flowApuestas,flowGracias,flowReiniciar  ]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()

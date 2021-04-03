const router = require('express').Router();
const usuariosController = require('../controllers/usuariosController');
const contactoController = require('../controllers/contactoController');
const mensajesController = require('../controllers/mensajesController');
const serviciosController = require('../controllers/serviciosController');
const passport = require('passport');

router.get('/', (req, res) => {
    // console.log(req.session.usuario_token)
    res.render('landing');
});


//nuevaVista---------------------------------

router.get('/nuevaVista', (req, res) => {
    // console.log(req.session.usuario_token)
    res.render('nuevasVistas/principal');
});
router.get('/nuevo2', (req, res) => {
    // console.log(req.session.usuario_token)
    res.render('layouts/nuevo2');
});
router.get('/newLayout', (req, res) => {
    // console.log(req.session.usuario_token)
    res.render('newLayout/principal');
});

//nuevaVista---------------------------------
router.get('/Contacto', (req, res) => {
    // console.log(req.session.usuario_token)
    res.render('contacto');
});

router.get('/crm', (req, res) => {
    // console.log(req.session.usuario_token)
    res.render('principal');
});

router.get('/paquetes/:IdPaquete', (req, res) => {
    
    res.render('paquetes');
});

router.get('/principal', (req, res) => {
    res.render('principal');
});

router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/crearUsuarios', (req, res) => {
    res.render('crearUsuarios');
});
router.get('/mostrarMensajes', (req, res) => {
    res.render('mostrarMensajes');
});
router.get('/chat', (req, res) => {
    res.render('chat');
});
router.get('/administrarChat', (req, res) => {
    res.render('administrarChat');
});
router.get('/chatMain', (req, res) => {
    res.render('chat');
});
router.get('/servicioUnico/:IdServicio', (req, res) => {
    res.render('servicioUnico');
});


router.post('/crear-cuenta-privada', usuariosController.crearCuentaPrivada);
router.post('/mandarContacto', contactoController.mandarContacto);
router.get('/getContactos', contactoController.getContactos);
router.post('/getMensajes', mensajesController.getMensajes);
router.post('/createSala', mensajesController.createSala);
router.get('/getSalas', mensajesController.getSalas);
router.post('/crearServicio', serviciosController.crearServicio);

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/principal',
    failureRedirect: '/login',
    failureFlash: true
  }));
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/principal',
    failureRedirect: '/crearUsuarios',
    failureFlash: true
  })); 

module.exports = router;
"use strict";
var tr, tg, tb, ta;
var width, height;
var photo1, canvas;
var pix, imgd, context;

function prefilter1() {

    photo1 = document.getElementById('photo1');
    canvas = document.getElementById('mycanvas1');
    context = canvas.getContext('2d');

    var x = 0;
    var y = 0;

    // redimensionne le canevas aux dimensions de l'image
    width = photo1.width;
    height = photo1.height;
    canvas.width = width;
    canvas.height = height;

    // recopie l'image dans le canevas
    context.drawImage(photo1, 0, 0, width, height);

    // extrait le tableau de pixels du canevas
    imgd = context.getImageData(0, 0, photo1.width, photo1.height);
    pix = imgd.data;


    // PASSAGE EN 1D POUR SIMPLIFIER LA GESTION DU VOISINAGE
    // 1 tab 1D -> 4 tab 2D (r,g,b,a) 
    // déclaration de 4 tableaux à 2 dim (de taille width * height)
    tr = new Array(width).fill().map(() => Array(height));
    tg = new Array(width).fill().map(() => Array(height));
    tb = new Array(width).fill().map(() => Array(height));
    ta = new Array(width).fill().map(() => Array(height));



    // copie des valeurs
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            tr[x][y] = pix[x * 4 + y * (width * 4) + 0];
            tg[x][y] = pix[x * 4 + y * (width * 4) + 1];
            tb[x][y] = pix[x * 4 + y * (width * 4) + 2];
            ta[x][y] = pix[x * 4 + y * (width * 4) + 3];
        }
    }
}

function postfilter1() {
    // RETOUR EN 1D POUR AFFICHER LES MODIFICATIONS
    // 4 tab 2D (r,g,b,a) -> 1 tab 1D POUR METTRE A JOUR L'IMAGE
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            pix[x * 4 + y * (width * 4) + 0] = tr[x][y];
            pix[x * 4 + y * (width * 4) + 1] = tg[x][y];
            pix[x * 4 + y * (width * 4) + 2] = tb[x][y];
            pix[x * 4 + y * (width * 4) + 3] = ta[x][y];
        }
    }

    // Draw the ImageData at the given (x,y) coordinates.
    context.putImageData(imgd, 0, 0);

    var data1 = canvas.toDataURL('image/png');
    photo1.setAttribute('src', data1);
}


function negative1() {
    // CHARGEMENT DES TABLEAUX DE PIXELS
    prefilter1();
    for (var y = 0; y < height; y++) { //FILTRE NÉGATIF
        for (var x = 0; x < width; x++) {
            tr[x][y] = 255 - tr[x][y];
            tg[x][y] = 255 - tg[x][y];
            tb[x][y] = 255 - tb[x][y];
            ta[x][y] = 255;
        }
    }
    // MISE À JOUR DE L'IMAGE
    postfilter1();
}

function whiteBlack1() {
    // CHARGEMENT DES TABLEAUX DE PIXELS
    prefilter1();
    for (var y = 0; y < height; y++) { //FILTRE NOIR ET BLANC
        for (var x = 0; x < width; x++) {
            tr[x][y] = (tr[x][y] + tg[x][y] + tb[x][y]) / 3;
            tg[x][y] = (tr[x][y] + tg[x][y] + tb[x][y]) / 3;
            tb[x][y] = (tr[x][y] + tg[x][y] + tb[x][y]) / 3;
            ta[x][y] = 255;
        }
    }
    // MISE À JOUR DE L'IMAGE
    postfilter1();
}

function addContrast1() {
    // CHARGEMENT DES TABLEAUX DE PIXELS
    prefilter1();
    for (var y = 0; y < height; y++) { //FILTRE CONTRASTE
        for (var x = 0; x < width; x++) {
            if (tr[x][y] <= 255 / 2) {
                tr[x][y] = tr[x][y] - 10;
            } else {
                tr[x][y] = tr[x][y] + 10;
            }
            if (tg[x][y] <= 255 / 2) {
                tg[x][y] = tg[x][y] - 10;
            } else {
                tg[x][y] = tg[x][y] + 10
            }
            if (tb[x][y] <= 255 / 2) {
                tb[x][y] = tb[x][y] - 10;
            } else {
                tb[x][y] = tb[x][y] + 10
            }
        }
    }
    // MISE À JOUR DE L'IMAGE
    postfilter1();
}

function subContrast1() {
    // CHARGEMENT DES TABLEAUX DE PIXELS
    prefilter1();
    for (var y = 0; y < height; y++) { //FILTRE CONTRASTE
        for (var x = 0; x < width; x++) {
            if (tr[x][y] <= 255 / 2) {
                tr[x][y] = tr[x][y] + 10;
            } else {
                tr[x][y] = tr[x][y] - 10;
            }
            if (tg[x][y] <= 255 / 2) {
                tg[x][y] = tg[x][y] + 10;
            } else {
                tg[x][y] = tg[x][y] - 10
            }
            if (tb[x][y] <= 255 / 2) {
                tb[x][y] = tb[x][y] + 10;
            } else {
                tb[x][y] = tb[x][y] - 10
            }
        }
    }
    // MISE À JOUR DE L'IMAGE
    postfilter1();
}

function addLuminosity1() {
    // CHARGEMENT DES TABLEAUX DE PIXELS
    prefilter1();
    for (var y = 0; y < height; y++) { //FILTRE LUMINOSITÉ
        for (var x = 0; x < width; x++) {
            tr[x][y] = tr[x][y] + 10;
            tg[x][y] = tg[x][y] + 10;
            tb[x][y] = tb[x][y] + 10;
        }
    }
    // MISE À JOUR DE L'IMAGE
    postfilter1();
}

function subLuminosity1() {
    // CHARGEMENT DES TABLEAUX DE PIXELS
    prefilter1();
    for (var y = 0; y < height; y++) { //FILTRE LUMINOSITÉ
        for (var x = 0; x < width; x++) {
            tr[x][y] = tr[x][y] - 10;
            tg[x][y] = tg[x][y] - 10;
            tb[x][y] = tb[x][y] - 10;
        }
    }
    // MISE À JOUR DE L'IMAGE
    postfilter1();
}

function drawing1() {
    // CHARGEMENT DES TABLEAUX DE PIXELS
    prefilter1();
    for (var y = 0; y < height; y++) { //FILTRE NOIR ET BLANC
        for (var x = 0; x < width; x++) {
            tr[x][y] = (tr[x][y] + tg[x][y] + tb[x][y]) / 3;
            tg[x][y] = (tr[x][y] + tg[x][y] + tb[x][y]) / 3;
            tb[x][y] = (tr[x][y] + tg[x][y] + tb[x][y]) / 3;
            ta[x][y] = 255;
        }
    }

    for (var y = 0; y < height; y++) { //FILTRE LUMINOSITÉ
        for (var x = 0; x < width; x++) {
            tr[x][y] = tr[x][y] + 40;
            tg[x][y] = tg[x][y] + 40;
            tb[x][y] = tb[x][y] + 40;

        }
    }

    for (var y = 0; y < height; y++) { //FILTRE CONTRASTE
        for (var x = 0; x < width; x++) {
            if (tr[x][y] <= 255 / 2) {
                tr[x][y] = tr[x][y] - 80;
            } else {
                tr[x][y] = tr[x][y] + 80;
            }
            if (tg[x][y] <= 255 / 2) {
                tg[x][y] = tg[x][y] - 80;
            } else {
                tg[x][y] = tg[x][y] + 80
            }
            if (tb[x][y] <= 255 / 2) {
                tb[x][y] = tb[x][y] - 80;
            } else {
                tb[x][y] = tb[x][y] + 80
            }
        }
    }

    for (var y = 0; y < height; y++) { //FILTRE NOIR ET BLANC
        for (var x = 0; x < width; x++) {
            tr[x][y] = (tr[x][y] + tg[x][y] + tb[x][y]) / 3;
            tg[x][y] = (tr[x][y] + tg[x][y] + tb[x][y]) / 3;
            tb[x][y] = (tr[x][y] + tg[x][y] + tb[x][y]) / 3;
            ta[x][y] = 255;
        }
    }

    // MISE À JOUR DE L'IMAGE
    postfilter1();
}
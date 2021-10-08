"use strict";
var tr, tg, tb, ta;
var width, height;
var photo2, canvas;
var pix, imgd, context;


function prefilter2() {

    photo2 = document.getElementById('photo2');
    canvas = document.getElementById('mycanvas2');
    context = canvas.getContext('2d');

    var x = 0;
    var y = 0;

    // redimensionne le canevas aux dimensions de l'image
    width = photo2.width;
    height = photo2.height;
    canvas.width = width;
    canvas.height = height;

    // recopie l'image dans le canevas
    context.drawImage(photo2, 0, 0, width, height);

    // extrait le tableau de pixels du canevas
    imgd = context.getImageData(0, 0, photo2.width, photo2.height);
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

function postfilter2() {
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

    var data2 = canvas.toDataURL('image/png');
    photo2.setAttribute('src', data2);
}


function negative2() {
    // CHARGEMENT DES TABLEAUX DE PIXELS
    prefilter2();
    for (var y = 0; y < height; y++) { //FILTRE NÉGATIF
        for (var x = 0; x < width; x++) {
            tr[x][y] = 255 - tr[x][y];
            tg[x][y] = 255 - tg[x][y];
            tb[x][y] = 255 - tb[x][y];
            ta[x][y] = 255;
        }
    }
    // MISE À JOUR DE L'IMAGE
    postfilter2();
}

function whiteBlack2() {
    // CHARGEMENT DES TABLEAUX DE PIXELS
    prefilter2();
    for (var y = 0; y < height; y++) { //FILTRE NOIR ET BLANC
        for (var x = 0; x < width; x++) {
            tr[x][y] = (tr[x][y] + tg[x][y] + tb[x][y]) / 3;
            tg[x][y] = (tr[x][y] + tg[x][y] + tb[x][y]) / 3;
            tb[x][y] = (tr[x][y] + tg[x][y] + tb[x][y]) / 3;
            ta[x][y] = 255;
        }
    }
    // MISE À JOUR DE L'IMAGE
    postfilter2();
}

function addContrast2() {
    // CHARGEMENT DES TABLEAUX DE PIXELS
    prefilter2();
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
    postfilter2();
}

function subContrast2() {
    // CHARGEMENT DES TABLEAUX DE PIXELS
    prefilter2();
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
    postfilter2();
}

function addLuminosity2() {
    // CHARGEMENT DES TABLEAUX DE PIXELS
    prefilter2();
    for (var y = 0; y < height; y++) { //FILTRE LUMINOSITÉ
        for (var x = 0; x < width; x++) {
            tr[x][y] = tr[x][y] + 10;
            tg[x][y] = tg[x][y] + 10;
            tb[x][y] = tb[x][y] + 10;
        }
    }
    // MISE À JOUR DE L'IMAGE
    postfilter2();
}

function subLuminosity2() {
    // CHARGEMENT DES TABLEAUX DE PIXELS
    prefilter2();
    for (var y = 0; y < height; y++) { //FILTRE LUMINOSITÉ
        for (var x = 0; x < width; x++) {
            tr[x][y] = tr[x][y] - 10;
            tg[x][y] = tg[x][y] - 10;
            tb[x][y] = tb[x][y] - 10;
        }
    }
    // MISE À JOUR DE L'IMAGE
    postfilter2();
}

function drawing2() {
    // CHARGEMENT DES TABLEAUX DE PIXELS
    prefilter2();
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
    postfilter2();
}

function binarisation2() {
    // CHARGEMENT DES TABLEAUX DE PIXELS
    prefilter2();

    for (var y = 0; y < height; y++) { //FILTRE LUMINOSITÉ
        for (var x = 0; x < width; x++) {
            if (tr[x][y] < 255 / 2) {
                tr[x][y] = 0;
            } else {
                tr[x][y] = 255;
            }
            if (tg[x][y] < 255 / 2) {
                tg[x][y] = 0;
            } else {
                tg[x][y] = 255;
            }
            if (tb[x][y] < 255 / 2) {
                tb[x][y] = 0;
            } else {
                tb[x][y] = 255;
            }
        }
    }
    // MISE À JOUR DE L'IMAGE
    postfilter2();
}

function flou2() {
    // CHARGEMENT DES TABLEAUX DE PIXELS
    prefilter2();
    for (var y = 1; y < height - 1; y++) { //FILTRE DE FLOU
        for (var x = 1; x < width - 1; x++) {
            tr[x][y] = (tr[x - 1][y + 1] + tr[x][y + 1] + tr[x + 1][y + 1] +
                tr[x - 1][y] + tr[x][y] + tr[x + 1][y] +
                tr[x - 1][y - 1] + tr[x][y - 1] + tr[x + 1][y - 1]) / 9;
            tg[x][y] = (tg[x][y + 1] + tg[x][y] + tg[x][y - 1] +
                tg[x + 1][y + 1] + tg[x + 1][y] + tg[x + 1][y - 1] +
                tg[x - 1][y + 1] + tg[x - 1][y] + tg[x - 1][y - 1]) / 9;
            tb[x][y] = (tb[x][y + 1] + tb[x][y] + tb[x][y - 1] +
                tb[x + 1][y + 1] + tb[x + 1][y] + tb[x + 1][y - 1] +
                tb[x - 1][y + 1] + tb[x - 1][y] + tb[x - 1][y - 1]) / 9;
        }
    }
    // MISE À JOUR DE L'IMAGE
    postfilter2();
}
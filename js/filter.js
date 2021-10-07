(function() {
    var vinvertbutton = null;

    function myInvert() {
        var photo = document.getElementById('photo');
        var canvas = document.getElementById('mycanvas');
        var context = canvas.getContext('2d');

        var luminosity = document.getElementById('luminosity').value;

        // Get the CanvasPixelArray from the given coordinates and dimensions.
        x = 0;
        y = 0;
        width = canvas.width;
        height = canvas.height;

        var imgd = context.getImageData(x, y, width, height);
        var pix = imgd.data;


        console.log("height=" + height + ", width=" + width);
        /*
        // EXEMPLE DE TRAITEMENT EN 1D
        // Loop over each pixel and invert the color.
        for (var i = 0; i < pix.length; i += 4) {
        	pix[i  ] = 255 - pix[i  ]; // red
        	pix[i+1] = 255 - pix[i+1  ]; // green
        	pix[i+2] = 255 - pix[i+2  ]; // blue

        	pix[i  ] = 255 ; // red
        	pix[i+1] = 255 ; // green
        	pix[i+2] = 0 ; // blue
        	// i+3 is alpha (the fourth element)
        }
        */

        // PASSAGE EN 1D POUR SIMPLIFIER LA GESTION DU VOISINAGE
        // 1 tab 1D -> 4 tab 2D (r,g,b,a) 
        // déclaration de 4 tableaux à 2 dim (de taille width * height)
        var tr = new Array(width).fill().map(() => Array(height));
        var tg = new Array(width).fill().map(() => Array(height));
        var tb = new Array(width).fill().map(() => Array(height));
        var ta = new Array(width).fill().map(() => Array(height));

        // copie des valeurs
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                tr[x][y] = pix[x * 4 + y * (width * 4) + 0];
                tg[x][y] = pix[x * 4 + y * (width * 4) + 1];
                tb[x][y] = pix[x * 4 + y * (width * 4) + 2];
                ta[x][y] = pix[x * 4 + y * (width * 4) + 3];
            }
        }

        // TRAITEMENT / APPLICATION D'UN FILTRE
        // mise en rouge de la moitier gauche
        /*for (var y = height / 2; y < height; y++) {
            for (var x = width / 2; x < width; x++) {
                tr[x][y] = 0;
                tg[x][y] = 0;
                tb[x][y] = 0;
                ta[x][y] = 0; //transparence du filtre
            }
        }*/

        /*for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x = x + 20) {
                tr[x][y] = 0;
                tg[x][y] = 0;
                tb[x][y] = 0;
                ta[x][y] = 255;
            }
        }
        for (var y = 0; y < height; y++) {
            for (var x = 1; x < width; x = x + 20) {
                tr[x][y] = 0;
                tg[x][y] = 0;
                tb[x][y] = 0;
                ta[x][y] = 255;
            }
        }
        for (var y = 0; y < height; y++) {
            for (var x = 2; x < width; x = x + 20) {
                tr[x][y] = 0;
                tg[x][y] = 0;
                tb[x][y] = 0;
                ta[x][y] = 255;
            }
        }*/



        /*for (var y = 0; y < height; y++) { //FILTRE LUMINOSITÉ
            for (var x = 0; x < width; x++) {
                tr[x][y] = tr[x][y] + luminosity;
                tg[x][y] = tg[x][y] + luminosity;
                tb[x][y] = tb[x][y] + luminosity;

            }
        }*/

        /*for (var y = 0; y < height; y++) { //FILTRE CONTRASTE
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
        }*/

        /*for (var y = height / 2; y < height; y++) { //FILTRE NÉGATIF SPACEs
            for (var x = 0; x < width / 2; x++) {
                tr[x][y] = 255 - tr[x][y];
            }
        }
        for (var y = 0; y < height / 3; y++) {
            for (var x = width / 4; x < width; x++) {
                tb[x][y] = 255 - tr[x][y];
            }
        }
        for (var y = 2 * height / 3; y < height; y++) {
            for (var x = 3 * width / 4; x < width; x++) {
                tg[x][y] = 255 - tr[x][y];
            }
        }
        for (var y = 1 * height / 4; y < 3 * height / 4; y++) {
            for (var x = 1 * width / 4; x < 3 * width / 4; x++) {
                tr[x][y] = 255 - tr[x][y];
                tb[x][y] = 255 - tr[x][y];
                tg[x][y] = 255 - tr[x][y];
            }
        }
        for (var y = 0; y < height; y++) {
            for (var x = 2 * width / 10; x < 3 * width / 10; x++) {
                tr[x][y] = 255 - tr[x][y];
                tb[x][y] = 255 - tr[x][y];
                tg[x][y] = 255 - tr[x][y];
            }
        }*/


        /*for (var y = 0; y < height; y++) { //TRANSPARENCE
            for (var x = 0; x < width; x++) {
                ta[x][y] = 255;
            }
        }*/

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

        var data = canvas.toDataURL('image/png');
        photo.setAttribute('src', data);
    }

    function afterload() {
        vinvertbutton = document.getElementById('invertbutton');

        // ICI je fais le lien entre ma fonction myInert() et l'évenement click du bouton innvert
        vinvertbutton.addEventListener('click', function(ev) { myInvert(); }, false);

    }
    window.addEventListener('load', afterload, false);
})();
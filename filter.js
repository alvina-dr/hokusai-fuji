(function() {
    var invertbutton = null;


    function myInvert() {
        var image = document.getElementById('photo');
        var canvas = document.getElementById('mycanvas');
        var context = canvas.getContext('2d');

        // Get the CanvasPixelArray from the given coordinates and dimensions.
        var x = 0;
        var y = 0;
        var width = canvas.width / 1; /*changer la largeur qui est filtré*/
        var height = canvas.height / 1; /*changer la hauteur qui est filtré*/

        var imgd = context.getImageData(x, y, width, height);
        var pix = imgd.data;

        ///////////////////////////////////////////////////////////////////
        // passage d'un tableau 1D (pix) à un tableau 2D pour la composante rouge (tr)

        x = 0;
        y = 0;
        // déclaration d'un tableau à 2 dimensions
        var tr = new Array(width).fill(new Array(height));
        var tg = new Array(width).fill(new Array(height));
        var tb = new Array(width).fill(new Array(height));
        var ta = new Array(width).fill(new Array(height));


        // boucle pour parcourir toutes les valeurs de mon tableau à 1 dim
        for (var i = 0; i < pix.length; i = i + 4) {
            tr[x][y] = pix[i];
            tg[x][y] = pix[i + 1];
            tb[x][y] = pix[i + 2];
            ta[x][y] = pix[i + 3];
            x = x + 1;
            if (x == width) { // quand dois je revenir à la ligne
                y = y + 1;
                x = 0;
            }
        }
        var tm = (tr + tg + tb) / 3;

        //boucle pour afficher en bleu/blanc
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                /*if (tm > 200) {
                    tr[x][y] = 255; //red
                } else if (tm > 100 & tm < 200) {
                    tr[x][y] = 150; //red
                } else if (tm > 10 & tm < 100) {
                    tr[x][y] = 50; //red
                } else if (tm < 10) {
                    tr[x][y] = 0; //red
                }
                if (tm > 200) {
                    tg[x][y] = 255; //red
                } else if (tm > 100 & tm < 200) {
                    tg[x][y] = 150; //red
                } else if (tm > 10 & tm < 100) {
                    tg[x][y] = 50; //red
                } else if (tm < 10) {
                    tg[x][y] = 0; //red
                }
                if (tm > 200) {
                    tb[x][y] = 255; //red
                } else if (tm > 100 & tm < 200) {
                    tb[x][y] = 150; //red
                } else if (tm > 10 & tm < 100) {
                    tb[x][y] = 50; //red
                } else if (tm < 10) {
                    tb[x][y] = 0; //red
                }*/
                tr[x][y] = 200; /*red*/
                tg[x][y] = 100; /*green*/
                tb[x][y] = 150; /*blue*/
                ta[x][y] = 255; /*alpha*/
            }
        }


        ///////////////////////////////////////////////////////////////////
        // passage des tableaux 2D (t?) à un tableau 1D (pix)
        var i = 0;
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                pix[i] = tr[x][y];
                //pix[i + 1] = tg[x][y];
                pix[i + 2] = tb[x][y];
                //pix[i + 3] = ta[x][y];
                i = i + 4;
            }
        }
        imgd.data = pix;

        // Draw the ImageData at the given (x,y) coordinates.
        context.putImageData(imgd, 0, 0);

        var data = canvas.toDataURL('image/png');
        image.setAttribute('src', data);
    }

    function afterload() {
        invertbutton = document.getElementById('invertbutton');

        invertbutton.addEventListener('click', function(ev) {
            myInvert();
        }, false);

    }
    window.addEventListener('load', afterload, false);
})();